{% extends 'layout.swig' %}

{% block title %}Not My Page{% endblock %}

{% block head %}
  {% parent %}
  <link rel="stylesheet" href="custom.css">
{% endblock %}

{% block content %}
			<div class="jumbotron" id="donate">
        <h1>Commit right now.</h1>
        <p class="lead">Thank you very much. We'll add a dollar to your account with just one touch.</p>
        <p>
					<form action = "/post" method = "post">
					<input type="submit" name="addOne" value="Add $1" class="btn btn-lg btn-success" />
					</form>
				</p>	
      </div>
{% endblock %}