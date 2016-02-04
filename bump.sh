VSN=$(grep 'version=".*\..*\..*"' $1 | sed 's/version=".*\..*\.\(.*\)"/\1/')
VSN=$(expr $VSN + 1)
sed -i '' "s/\(version=\".*\..*\.\).*\(\"\)/\1$VSN\2/" $1
