<?php
namespace App\Helper;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Persistence\ManagerRegistry;

class UtilHelper
{
    public static function toCamelCase($input, $separator = "_", $capitalizeFirstCharacter = false){

        $str = str_replace($separator, '', ucwords($input, $separator));
        if (!$capitalizeFirstCharacter) {
            $str = lcfirst($str);
        }
        return $str;
    }
}