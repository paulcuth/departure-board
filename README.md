# departure-board

Departure board is a JavaScript/CSS3 implementation of a rail station departure board. It was created as an experiment to see how browsers handle many transitions simultaneously. 

The conclusion was: not great. At the time of posting, I'm getting the following results on my Mac...

* WebKit - Inconsistent. Sometimes runs smoothy, but most of the time it's jumpy and the whole document often flashes.
* Firefox - Had the smoothest results, but it looks like it is achieving this by ignoring some transitions when there are too many at once.
* Opera - Handled the transitions in much the same way as Firefox, except the text appeared blotchy during the transform.
* IE - Untested.

See the example in action at: http://paulcuth.me.uk/departure-board


## Acknowledgements

The CSS styling that is used in this project is heavily based on [Jakub Hampl](https://github.com/gampleman)'s great article "[Designing a departures board with CSS3](http://gampleman.eu/post/1488470623/designing-a-departures-board-with-css3)".


## License 

(The MIT License)

Copyright (c) 2011 Paul Cuthbertson &lt;github@paulcuth.me.uk&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.