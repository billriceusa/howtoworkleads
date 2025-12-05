#!/bin/bash
# Run this locally to deploy the Sanity hosted studio
cd "$(dirname "$0")"
npx sanity deploy -y
