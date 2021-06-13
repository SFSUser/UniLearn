<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Helper\HttpHelper;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @Route("/api/security")
 */
class SecurityController extends AbstractController
{
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
        return HttpHelper::goodResponse();
    }
}
