//
// MIT License
//
// Copyright (c) 2018 Ardalan Amini
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//

import * as webpack from 'webpack'
import namedCSS, { Named } from 'named.css'

class NamedCSSWebpack {
  protected prefix = ''
  protected classes: Named = {}
  protected ids: Named = {}

  constructor(prefix: string = '') {
    this.prefix = prefix
  }

  apply(compiler: webpack.Compiler) {
    compiler.plugin('emit', (compilation: { [key: string]: any }, callback: () => void) => {
      // name all css files
      for (let filename in compilation.assets) {
        if (/\.css$/.test(filename)) {
          let named = compilation.assets[filename].source()

          named = namedCSS(named, this.prefix, this.classes, this.ids)

          this.classes = named.classes
          this.ids = named.ids

          compilation.assets[filename] = {
            source: function() {
              return named.output
            },
            size: function() {
              return named.output.length
            }
          }
        }
      }

      for (let filename in compilation.assets) {
        if (/\.js$/.test(filename)) {
          let named = compilation.assets[filename].source()

          named.replace(/class(Name)?=\'([a-zA-Z0-9- ]*)\'/g, (match: string, n: string, origin: string) => {
            let classes = origin.split(' ')

            classes = classes.map((c) => this.classes[c] || c)

            return match.replace(origin, classes.join(' '))
          })

          named.replace(/class(Name)?=\"([a-zA-Z0-9- ]*)\"/g, (match: string, n: string, origin: string) => {
            let classes = origin.split(' ')

            classes = classes.map((c) => this.classes[c] || c)

            return match.replace(origin, classes.join(' '))
          })

          compilation.assets[filename] = {
            source: function() {
              return named
            },
            size: function() {
              return named.length
            }
          }
        }
      }

      callback()
    })
  }
}

module.exports = NamedCSSWebpack
