#/bin/bash
# pid=$(pgrep $attribute)
# 	# Check if the process is running
# 	if [ -z "$pid" ]; then
# 	  echo "No process found with attribute $attribute"
# 	else
# 	  # Send a SIGTERM signal to the process to gracefully terminate
# 	  kill $pid
#     fi
tsc

node dist/index.js

