SRCDIR:=www

all: clean $(SRCDIR).zip

%.zip: %
	bash release.sh www/js/debug.js
	bash bump.sh www/config.xml
	zip -r $@ $<
	bash unrelease.sh www/js/debug.js

clean:
	rm -rf $(SRCDIR).zip
