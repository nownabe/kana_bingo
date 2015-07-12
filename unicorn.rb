app_path = File.expand_path("../", __FILE__)

worker_processes 1
working_directory app_path

timeout 100
listen 8080

pid File.join(app_path, "tmp/unicorn.pid")

stderr_path File.join(app_path, "log/unicorn.stderr.log")
stdout_path File.join(app_path, "log/unicorn.stdout.log")
