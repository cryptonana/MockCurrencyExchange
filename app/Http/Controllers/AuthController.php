<?php


namespace App\Http\Controllers;

use API\Requests\RegisterRequest;
use App\Repositories\UserRepository;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;

/**
 * Created by PhpStorm.
 * User: egordm
 * Date: 2-12-2017
 * Time: 00:22
 */
class AuthController extends Controller
{
	use RegistersUsers, AuthenticatesUsers{
		AuthenticatesUsers::guard insteadof RegistersUsers;
		AuthenticatesUsers::redirectPath insteadof RegistersUsers;
	}

	public function postLogin(Request $request)
	{
		$request->session()->regenerate();
		$this->clearLoginAttempts($request);

        if (! auth()->attempt(request(['email', 'password'])))
        {
            return back() ->withErrors([
                'message' => 'no correct'
            ]);
        }

		if ($request->acceptsJson()) return ['success' => true];


		else  return $this->authenticated($request, $this->guard()->user()) ?: redirect()->intended($this->redirectPath());
	}

	public function login(){
	    return view('login');
    }

    public function postRegister(RegisterRequest $request, UserRepository $userRepository)
    {


        event(new Registered($user = $userRepository->create($request->all())));

        $this->guard()->login($user);

        if ($request->acceptsJson()) return ['success' => true];
        else return $this->registered($request, $user) ?: redirect($this->redirectPath());

    }

    public function create()
    {
        return view('register');
    }

    public function destroy()
    {
        auth()->logout();
        return redirect()->home();
    }
}