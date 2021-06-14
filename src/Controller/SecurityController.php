<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Helper\EntityHelper;
use App\Helper\HttpHelper;
use App\Helper\UtilHelper;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\EventDispatcher\EventDispatcher;

/**
 * @Route("/api/security")
 */
class SecurityController extends AbstractController
{
    /**
     * @param Controller $controller
     */
    public function loginUser(AbstractController $controller, Request $request, User $account) {
        //procedemos a iniciar sesión
        $token = new UsernamePasswordToken($account, null, 'main', $account->getRoles());
        $token->setUser($account);
        $controller->get('security.token_storage')->setToken($token);
        $session = $request->getSession();
        $session->set('_security_main', serialize($token));
        $session->save();
        //SessionHelper::setUS($account->getId());
        $event = new InteractiveLoginEvent($request, $token);
        $event_dispatcher = new EventDispatcher();
        $event_dispatcher->dispatch($event, "security.interactive_login");
    }

    /**
     * @Route("/test2", name="user_test")
     */
    public function test(Request $request)
    {
        $doctrine = $this->getDoctrine();
        $data = EntityHelper::serializeEntity($doctrine, $this->getUser());
        return new JsonResponse($data);
    }

    /**
     * @Route("/redirect", name="user_login")
     */
    public function redirection(Request $request)
    {
        $route = $request->get("redirect", "main");
        $path = $this->generateUrl($route);
        return $this->redirect($path);
    }

    /**
     * @Route("/login", name="user_check")
     */
    public function login(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $doctrine = $this->getDoctrine();
        $username = $request->get("username", "user");
        $password = $request->get("password", "asd");
        $user = $this->getUser();
        //$user = new User();
        $repo = $doctrine->getRepository(User::class);
        $user = $repo->findOneBy([
            "username" => $username
        ]);

        $valid = $passwordEncoder->isPasswordValid($user, $password);
        if($valid){
            $this->loginUser($this, $request, $user);
        }

        $user_data = EntityHelper::serializeEntity($doctrine, $this->getUser());
        return HttpHelper::goodResponse($user_data);
    }

    /**
     * @Route("/user", name="user_data",)
     */
    public function user(): JsonResponse
    {
        $doctrine = $this->getDoctrine();
        $user = $this->getUser();

        if(is_null($user)){
            return HttpHelper::badResponse("User not authenticated");
        }
        $user_data = EntityHelper::serializeEntity($doctrine, $user);
        return HttpHelper::goodResponse($user_data);
    }

    /**
     * @Route("/logout", name="user_logout")
     */
    public function logout(): JsonResponse
    {
        $user = $this->getUser();
        return HttpHelper::goodResponse();
    }

    /**
     * @Route("/reset_password", name="user_reset_password")
     */
    public function resetPassword(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {

        $doctrine = $this->getDoctrine();
        $repo = $doctrine->getRepository(User::class);

        $user = $this->getUser();
        $current_login = !is_null($user);
        $valid_password = $current_login;
        $password = $request->get("password", "");
        $new_password = $request->get("new_password", "");
        $username = $request->get("username", "");

        if(is_null($user) && !empty($username)){
            $user = $repo->findOneBy([
                "username" => $username
            ]);

        }
        // Not user found
        if(is_null($user)){
            return HttpHelper::badResponse("User not found or authenticated");
        }
        // Check login!
        if(!$current_login){
            $valid_password = $passwordEncoder->isPasswordValid($user, $password);
        }
        if(!$valid_password){
            return HttpHelper::badResponse("User not authenticated");
        }

        $new_password = $passwordEncoder->encodePassword($user, $new_password);
        $user->setPassword($password);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();
        return HttpHelper::goodResponse();
    }

    /**
     * @Route("/register", name="user_register")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {

        $doctrine = $this->getDoctrine();
        $repo = $doctrine->getRepository(User::class);

        // 1) build the form
        $user = new User();
        $valid = true;
        $firstName = $request->get("firstName", null);
        $lastName = $request->get("lastName", null);
        $username = $request->get("username", null);
        $password = $request->get("password", null);
        $email = $request->get("email", null);
        $message = "";

        if($repo->checkUserExists($username) ){
            $valid = false;
            $message = "El usuario ya se encuentra registrado";
        }
        if($repo->checkUserExists($email, "email")){
            $valid = false;
            $message = "El email ya se encuentra registrado";
        }
        if(empty($firstName) || empty($lastName) || empty($email)){
            $valid = false;
            $message = "Verifica que todos los campos no estén vacíos";
        }

        if ($valid) {
            // 3) Encode the password (you could also do this via Doctrine listener)
            $password = $passwordEncoder->encodePassword($user, $password);
            $user->setPassword($password);
            $user->setFirstName($firstName);
            $user->setLastName($lastName);
            $user->setEmail($email);
            $user->setUsername($username);

            // 4) save the User!
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            // ... do any other work - like sending them an email, etc
            // maybe set a "flash" success message for the user
        } else {
            return HttpHelper::badResponse($message, [$username, $firstName, $lastName, $email, $password]);
        }
        $user_data = EntityHelper::serializeEntity($doctrine, $user);
        return HttpHelper::goodResponse($user_data);
    }
}
