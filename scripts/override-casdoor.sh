#!/bin/bash
set -e

echo "🔧 Overriding Casdoor login, signup, and forget password pages..."

pwd
cp ../override/LoginPage.js ./src/auth/LoginPage.js
cp ../override/SignupPage.js ./src/auth/SignupPage.js
cp ../override/ForgetPage.js ./src/auth/ForgetPage.js

echo "✅ Override complete."
