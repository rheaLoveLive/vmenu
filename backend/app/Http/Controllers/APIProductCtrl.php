<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Exception;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class APIProductCtrl extends Controller
{
    public function index()
    {
        try {
            $result = [
                "error" => false,
                "data" => [
                    "dtProduct" => Product::all(),
                    "dtCateg" => Category::all(),
                ],
            ];
        } catch (Exception $e) {
            $result = [
                "error" => true,
                "data" => $e,
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
                "nm_product" => "required|max:50",
                "no_product" => "required",
                "id_categ" => "required|numeric",
                "descr_product" => "required",
                "img_product" => "mimes:jpeg,jpg,png|max:2048|nullable",
                "price_product" => "required|numeric",
                "qty_product" => "required|numeric",
                "status_product" => "required|max:15",
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
            Product::create([
                "nm_product" => $req['nm_product'],
                "no_product" => $req['no_product'],
                "id_categ" => $req['id_categ'],
                "descr_product" => $req['descr_product'],
                "img_product" => $req['img_product'],
                "price_product" => $req['price_product'],
                "qty_product" => $req['qty_product'],
                "status_product" => $req['status_product'],
            ]);

            // Result Jika berhasil disimpan
            $result = [
                "error" => false,
                'text' => 'Data Berhasil Di Simpan'
            ];
        } catch (Exception $err) {
            // Result Jika Gagal disimpan
            $result = [
                "error" => true,
                'text' => $err->getMessage()
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
                "nm_product" => "required|max:50",
                "no_product" => "required",
                "id_categ" => "required|numeric",
                "descr_product" => "required",
                "img_product" => "mimes:jpeg,jpg,png|max:2048|nullable",
                "price_product" => "required|numeric",
                "qty_product" => "required|numeric",
                "status_product" => "required|max:15",
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
            Product::find($req['id'])->update([
                "nm_product" => $req['nm_product'],
                "no_product" => $req['no_product'],
                "id_categ" => $req['id_categ'],
                "descr_product" => $req['descr_product'],
                "img_product" => $req['img_product'],
                "price_product" => $req['price_product'],
                "qty_product" => $req['qty_product'],
                "status_product" => $req['status_product'],
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
            Product::find($req['id'])->delete();

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
