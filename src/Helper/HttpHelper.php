<?php
namespace App\Helper;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\JsonResponse;

class HttpHelper
{
    public static function goodResponse($data = []): JsonResponse {
        return new JsonResponse([
            "result" => true,
            "data" => $data
        ]);   
    }

    public static function badResponse($message, $data = []): JsonResponse {
        return new JsonResponse([
            "result" => false,
            "message" => $message,
            "data" => $data
        ]);   
    }
}