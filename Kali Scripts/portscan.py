#!/bin/bash

# CONFIG SECTION
subnet="enter your subnet"
output_file="scan_report.txt"
bot_token="bot_token"
channel_id="channel_id"

# TEMP FILE TO HOLD LIVE HOSTS
live_hosts="live_hosts.txt"

echo "Pinging subnet $subnet.0/24..."
> "$live_hosts"

# Step 1: Ping sweep to find live hosts
for i in {1..254}; do
  ip="$subnet.$i"
  if ping -c 1 -W 1 "$ip" &> /dev/null; then
    echo "$ip" >> "$live_hosts"
    echo "  [+] Host up: $ip"
  fi
done

# Step 2: Run nmap only on live hosts
echo -e "\nRunning smart nmap scan on live hosts..."
> "$output_file"

while IFS= read -r ip; do
  echo -e "\nScanning $ip..." | tee -a "$output_file"
  nmap -Pn --top-ports 1000 --max-retries 2 --host-timeout 30s "$ip" >> "$output_file"
done < "$live_hosts"

# Step 3: Upload to Discord
echo -e "\nUploading scan report to Discord..."

curl -X POST "https://discord.com/api/v10/channels/$channel_id/messages" \
  -H "Authorization: Bot $bot_token" \
  -F "payload_json={\"content\": \"📄 Smart Nmap Report for $subnet.0/24\"}" \
  -F "file=@$output_file"

echo -e "\n✅ Scan complete and uploaded."
