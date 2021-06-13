<?php
namespace App\Repository;
use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
    public function checkUserExists($username, $key = "username"): bool
    {
        $result = $this->findOneBy([
            $key => $username
        ]);
        return $result !== null;
    }
}