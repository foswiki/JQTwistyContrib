# See bottom of file for license and copyright information

package Foswiki::Contrib::JQTwistyContrib::Core;
use strict;
use warnings;

use Foswiki::Contrib::JQTwistyContrib ();
use Foswiki::Plugins::JQueryPlugin::Plugin ();
our @ISA = qw( Foswiki::Plugins::JQueryPlugin::Plugin );

=begin TML

---+ package Foswiki::Contrib::JQTwistyContrib::Core

This is the perl stub for the jquery twisty plugin.

=cut

=begin TML

---++ ClassMethod new( $class, $session, ... )

Constructor

=cut

sub new {
  my $class = shift;
  my $session = shift || $Foswiki::Plugins::SESSION;

  my $this = bless(
    $class->SUPER::new(
      $session,
      name => 'JQTwisty',
      version => $Foswiki::Contrib::JQTwistyContrib::VERSION,
      author => 'Michael Daum',
      homepage => 'http://foswiki.org/Extensions/JQTwistyContrib',
      css => ['jquery.twisty.css'],
      javascript => ['jquery.twisty.js'],
      puburl => '%PUBURLPATH%/%SYSTEMWEB%/JQTwistyContrib',
    ),
    $class
  );

  return $this;
}

1;

__END__
Foswiki - The Free and Open Source Wiki, http://foswiki.org/

Copyright (C) 2012-2025 Michael Daum http://michaeldaumconsulting.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version. For
more details read LICENSE in the root of this distribution.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

As per the GPL, removal of this notice is prohibited.

