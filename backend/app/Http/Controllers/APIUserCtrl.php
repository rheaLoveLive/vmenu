<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class APIUserCtrl extends Controller
{


    public function index()
    {
        try {
            $dtUser = User::all();

            $result = [
                "error" => false,
                "data" => $dtUser,
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
                "name" => "required|max:50",
                "password" => "min:6|required",
                "email" => "unique:users|required",
                "role" => "required",
                "status" => "required"
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
            User::create([
                "name" => $req['name'],
                "email" => $req['email'],
                "password" => Hash::make($req['password']),
                "role" => $req['role'],
                "status" => $req['status'],
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
                "name" => "required|max:50",
                "email" => "required|email|unique:users,email," . $req['id'],
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
            $olDt = User::where('id', $req['id'])->first();

            User::find($req['id'])->update([
                "name" => $req['name'],
                "email" => $req['email'],
                "password" => $req['password'] === null ? $olDt->password : Hash::make($req['password']),
                "role" => $req['role'],
                "status" => $req['status'],
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
                'text' => 'Data Gagal Di Update' . $err->getMessage()
            ];
        }

        return response()->json($result)->header('Content-Type', 'application/json');

    }

    public function destroy(Request $request)
    {

        $req = $request->json()->all();

        try {
            User::find($req['id'])->delete();

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
