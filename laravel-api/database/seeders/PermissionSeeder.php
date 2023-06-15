<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [

            [
             'name' => 'Usuarios',
             'description' => 'Crear (inscribir), eliminar, editar y visualizar a los usuarios finales del gimnasio.', 
            ],
            [
             'name' => 'Personal',
             'description' => 'Crear, eliminar, editar y visualizar las
                            cuentas que podran ingresar a este sistema con sus
                            respectivos permisos.',
            ],
            [
             'name' => 'Asistencia',
             'description' => 'Crear, eliminar, editar y visualizar las asistencias de los usuarios del gimnasio',
            ],
            [
             'name' => 'Areas',
             'description' => 'Crear, eliminar, editar, y visualizar las areas del gimnasio',
            ],
            [
             'name' => 'Pagos',
             'description' => 'Pagos: Crear (registrar), eliminar, editar y visualizar los pagos realizados por los usuarios del
gimnasio',
            ],
            [
             'name' => 'Estados de Cuenta',
             'description' => ' Visualizar lista detallada de los estados de los usuarios del gimnasio',
            ],



         ];   

         DB::table('permissions')->insert($fields);
    }
}
