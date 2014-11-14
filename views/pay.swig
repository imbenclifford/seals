{% extends 'layout.swig' %}

{% block title %}Not My Page{% endblock %}

{% block head %}
  {% parent %}
  <!--link rel="stylesheet" href="custom.css"-->
{% endblock %}

{% block content %}
			<div class="jumbotron" id="dashboard">
        <h1>You've sealed ${{ counter }}</h1>
        <p class="lead">Now go donate it.</p>
        <p><a class="btn btn-lg btn-success" href="#" role="button">Go</a></p>
				<p><a class="btn btn-xs btn-primary" href="/home" role="button">Add another $1</a></p>
      </div>
{% endblock %}