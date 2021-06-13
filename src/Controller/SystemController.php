<?php

namespace App\Controller;

use App\Helper\HttpHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/system")
 */
class SystemController extends AbstractController
{
    /**
     * @Route("/routes", name="routes")
     */
    public function routes(){
        $router = $this->container->get('router');
        $collection = $router->getRouteCollection();
        $allRoutes = $collection->all();
        $routes = array();

        foreach ($allRoutes as $route => $params)
        {
            $defaults = $params->getDefaults();

            if (isset($defaults['_controller']))
            {
                $controllerAction = explode(':', $defaults['_controller']);
                $controller = $controllerAction[0];

                if (!isset($routes[$controller])) {
                    $routes[$controller] = [
                        "name" => $controller,
                        "routes" => []
                    ];
                }
                $pathVariables = $params->compile()->getPathVariables();

                if(empty($pathVariables)){
                    $routes[$controller]["routes"][] = [ 
                        "name" => $route,
                        "path" => $this->generateUrl($route) 
                    ];
                }
            }
            $routeArray = [];
            foreach($routes as $route){
                $routeArray[] = $route;
            }
        }
        return HttpHelper::goodResponse($routeArray);
    }


    /**
     * @Route("/create_db")
     * @Route("/update_db", name="_create_db")
     */
    public function createdbAction(KernelInterface $kernel) {
        //$kernel = $this->container->get('http_kernel');
        $app = new \Symfony\Bundle\FrameworkBundle\Console\Application($kernel);

        //$db_name = self::getDBNameFromDomain();

        $input = new \Symfony\Component\Console\Input\StringInput('doctrine:schema:update --force ');
        $output = new \Symfony\Component\Console\Output\StreamOutput(fopen('php://temp', 'w'));

        $app->doRun($input, $output);

        rewind($output->getStream());
        $response = stream_get_contents($output->getStream());

        return new \Symfony\Component\HttpFoundation\Response("<h1>Entidades actualizadas...</h1>"
                . "<hr><pre><code>" . $response . "</code></pre>");
    }
}
