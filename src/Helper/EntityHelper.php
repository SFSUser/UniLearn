<?php
namespace App\Helper;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Persistence\ManagerRegistry;

class EntityHelper
{
    public static function serializeEntity(ManagerRegistry $doctrine, $object, $keyAsColumnName = false){

        if(is_null($object)) {
            return [];
        }

        $columns = self::getColumns($doctrine, $object);
        $data = [];
        foreach($columns as $column){
            $column_camelcase = UtilHelper::toCamelCase($column, "_");
            $getter = "get$column_camelcase";
            $columnName = $keyAsColumnName ? $column : lcfirst($column_camelcase);
            if(method_exists($object, $getter)){
                $data[$columnName] = $object->$getter();
            }
        }
        return $data;
    }

    public static function getColumns(ManagerRegistry $doctrine, $object) {
        $class = $doctrine->getManager()->getClassMetadata(get_class($object));
        $fields = [];
        if (!empty($class->discriminatorColumn)) {
            $fields[] = $class->discriminatorColumn['name'];
        }
        $fields = array_merge($class->getColumnNames(), $fields);
        foreach ($fields as $index => $field) {
            if ($class->isInheritedField($field)) {
                unset($fields[$index]);
            }
        }
        foreach ($class->getAssociationMappings() as $name => $relation) {
            if (!$class->isInheritedAssociation($name)){
                foreach ($relation['joinColumns'] as $joinColumn) {
                    $fields[] = $joinColumn['name'];
                }
            }
        }
        return $fields;
    }
}