@extends('users::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('users.name') !!}</p>
@endsection
