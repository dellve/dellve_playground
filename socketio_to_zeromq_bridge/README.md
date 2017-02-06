
Getting Starged
---------------

1. Istall ZeroMQ C-libs:

<code>
	brew install zeromq
</code>

2. Install Node.js packages:

<code>
	npm install
</code>

3. Install Python packages:

<code> 
	virtualenv venv
	. venv/bin/activate 
	pip install -r requirements.txt
</code>

4. Start benchmark service:

<code>
	python benchend.py
</code>

5. Start backend service (from separate terminal tab or window):

<code>
	node backend.js
</code>

6. Visit localhost:3000 in your favourite web-browser :)