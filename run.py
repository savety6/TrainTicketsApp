import subprocess
import threading
import os

def run_command(cmd, cwd, prefix, color_code):
    # Check if node_modules directory exists
    if not os.path.exists(os.path.join(cwd, 'node_modules')):
        print(f'\033[{color_code}m{prefix}: Running yarn install\033[0m')
        install_process = subprocess.Popen('yarn install', stdout=subprocess.PIPE, stderr=subprocess.STDOUT, cwd=cwd, shell=True)
        for line in iter(install_process.stdout.readline, b''):
            print(f'\033[{color_code}m{prefix}: {line.decode().strip()}\033[0m')

    # Run the command
    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, cwd=cwd, shell=True)

    # Stream the output
    def stream_output(process, prefix, color_code):
        for line in iter(process.stdout.readline, b''):
            print(f'\033[{color_code}m{prefix}: {line.decode().strip()}\033[0m')

    # Start the stream_output in a separate thread
    thread = threading.Thread(target=stream_output, args=(process, prefix, color_code))
    thread.start()
    return thread

if __name__ == "__main__":
    threads = []
    threads.append(run_command("yarn startDev", "./back-end", "back-end", "33"))  # Yellow color
    threads.append(run_command("yarn dev", "./front-end", "front-end", "32"))  # Green color
    
    for thread in threads:
        thread.join()