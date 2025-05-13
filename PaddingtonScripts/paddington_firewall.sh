#!/bin/bash

# Flush existing rules
iptables -F
iptables -t nat -F

# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# Redirect HTTP traffic to Squid (transparent proxy)
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3128

# Allow traffic out
iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT
iptables -A FORWARD -i eth1 -o eth0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# Masquerade outbound traffic
iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE

echo "[+] Paddington firewall rules applied."
