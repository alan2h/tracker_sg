@extends('profiles::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('profiles.name') !!}</p>
@endsection
