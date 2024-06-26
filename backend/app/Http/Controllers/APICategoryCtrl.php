<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class APICategoryCtrl extends Controller
{
    public function index()
    {
        try {
            $dtCateg = Category::all();

            $result = [
                "error" => false,
                "data" => $dtCateg,
            ];
        } catch (Exception $e) {
            $result = [
                "error" => true,
                "data" => null,
            ];
        }

        return response()->json($result)->header('Content-Type', 'application/json');
    }

    public function create(Request $request)
    {

        $req = $request->json()->all();

        $validation = Validator::make(
            $req,
            [
                "nm_categ" => "required|max:50",
                "descr_categ" => "required",
            ],
        );

        if ($validation->fails()) {
            $result = [
                "error" => true,
                "data" => $validation->errors()
            ];
            return response()->json($result)->header('Content-Type', 'application/json');

        }

        try {
            Category::create([
                "nm_categ" => $req['nm_categ'],
                "descr_categ" => $req['descr_categ'],

            ]);

            // Result Jika berhasil disimpan
            $result = [
                'type' => 'success',
                'text' => 'Data Berhasil Di Simpan'
            ];
        } catch (Exception $err) {
            // Result Jika Gagal disimpan
            $result = [
                'type' => 'danger',
                'text' => 'Data Gagal Di Simpan'
            ];
        }

        return response()->json($result)->header('Content-Type', 'application/json');

    }

    public function update(Request $request)
    {

        $req = $request->json()->all();
        // return response()->json($req)->header('Content-Type', 'application/json');


        $validation = Validator::make(
            $req,
            [
                "nm_categ" => "required|max:50",
                "descr_categ" => "required",
            ],
        );

        if ($validation->fails()) {
            $result = [
                "error" => true,
                "validation" => $validation->errors()
            ];
            return response()->json($result)->header('Content-Type', 'application/json');
        }

        try {
            Category::find($req['id'])->update([
                "nm_categ" => $req['nm_categ'],
                "descr_categ" => $req['descr_categ'],
            ]);

            // Result Jika berhasil disimpan
            $result = [
                'type' => 'success',
                'text' => 'Data Berhasil Di Update'
            ];
        } catch (Exception $err) {
            // Result Jika Gagal disimpan
            $result = [
                'type' => 'danger',
                'text' => 'Data Gagal Di Update'
            ];
        }

        return response()->json($result)->header('Content-Type', 'application/json');

    }

    public function destroy(Request $request)
    {

        $req = $request->json()->all();

        try {
            Category::find($req['id'])->delete();

            // Result Jika berhasil disimpan
            $result = [
                'type' => 'success',
                'text' => 'Data Berhasil Di Hapus'
            ];
        } catch (Exception $err) {
            // Result Jika Gagal disimpan
            $result = [
                'type' => 'danger',
                'text' => 'Data Gagal Di Hapus'
            ];
        }

        return response()->json($result)->header('Content-Type', 'application/json');
    }
}
