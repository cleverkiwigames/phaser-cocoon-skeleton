SRCDIR:=www

all: clean $(SRCDIR).zip

%.zip: %
	bash bump.sh www/config.xml
	zip -r $@ $<

clean:
	rm -rf $(SRCDIR).zip
