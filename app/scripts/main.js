/*eslint-disable no-underscore-dangle */
/*eslint-disable no-use-before-define */
/*eslint-disable no-unused-vars */
/*global jQuery undefined WebFont PDFDocument blobStream Materialize*/
(function(document, window, $) {
  'use strict';

  var _fontSize = 24,
    _verticalLineMargin = 25,
    _lineWidth = 1,
    _margins = {
      top: _fontSize * 2,
      right: _verticalLineMargin + 10,
      bottom: _fontSize * 2,
      left: _verticalLineMargin + 10
    },
    _hLinesConfig = {
      'Sacramento': { baseLineY: _fontSize - 0.5, gap: _fontSize + 11.5, xHeightLineDiference: 6},
      'MrDeHaviland': { baseLineY: _fontSize - 0.9, gap: _fontSize + 13.7, xHeightLineDiference: 6},
      'Allura': { baseLineY: _fontSize - 1.5, gap: _fontSize + 13.5, xHeightLineDiference: 7},
      // 'HaikusScript': { baseLineY: _fontSize + 1.7, gap: _fontSize - 1.15, xHeightLineDiference: 8},
      'HaloHandletter': { baseLineY: _fontSize - 1.6, gap: _fontSize + 12.6, xHeightLineDiference: 5.5},
      // 'JaneAusten': { baseLineY: _fontSize + 0.5, gap: _fontSize + 5, xHeightLineDiference: 7},
      'Journal': { baseLineY: _fontSize - 0.2, gap: _fontSize + 15.421, xHeightLineDiference: 8},
      'QuilineScriptThin': { baseLineY: _fontSize - 2.3, gap: _fontSize + 17.1, xHeightLineDiference: 5}
    },

    _defaultText = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z\na b c d e f g h i j k l m n o p q r s t u v w x y z\n0 1 2 3 4 5 6 7 8 9\n[ ] ( ) ? ! , ; : < > / + -\nAAAAAAAAAABBBBBBBBBBCCCCCCCCCCDDDDDDDDDDEEEEEEEEEEFFFFFFFFFFGGGGGGGGGGHHHHHHHHHIIIIIIIIIIJJJJJJJJJJKKKKKKKKKKLLLLLLLLLLMMMMMMMMMMNNNNNNNNNNOOOOOOOOOOPPPPPPPPPPQQQQQQQQQQRRRRRRRRRRSSSSSSSSSSTTTTTTTTTTUUUUUUUUUUVVVVVVVVVVWWWWWWWWWWXXXXXXXXXXYYYYYYYYYYZZZZZZZZZZ\naaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhiiiiiiiiiijjjjjjjjjjkkkkkkkkkkllllllllllmmmmmmmmmmnnnnnnnnnnooooooooooppppppppppqqqqqqqqqqrrrrrrrrrrssssssssssttttttttttuuuuuuuuuuvvvvvvvvvvwwwwwwwwwwxxxxxxxxxxyyyyyyyyyyzzzzzzzzzz\n0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999\n[[[[[[[[[[ ]]]]]]]]]](((((((((( ))))))))))???????????!!!!!!!!!!,,,,,,,,,,;;;;;;;;;;::::::::::<<<<<<<<<< >>>>>>>>>>//////////++++++++++----------',

    $clearTextModal = $('#clear-text-modal'),
    $copybook = $('.copybook'),
    $printableText = $('#printable-text'),
    $fontLinks = $('.font-families-list li a'),
    _fontPath = 'font/',
    _dataFontAttr = 'data-font',
    _selectedFontAttr = 'selected-font',
    _fontClassSuffix = '-font',
    _fontClassAttr = 'data-font-class',
    _fontFamilyAttr = 'data-font-family',
    _selectedFont;

  function PDFBuilder(){
    this.printPdf = function(e) {
      if (e) {
        e.preventDefault();
      }

      if(!_selectedFont || !_selectedFont.length){
        Materialize.toast('Please, choose some typeface.', 5000, 'red lighten-1');
        return false;
      }else if(!$printableText.val().trim().length){
        Materialize.toast('Please, enter some text for printing.', 5000, 'red lighten-1');
        return false;
      }

      generatePdf(_fontPath + 'ttf/' + _selectedFont + '.ttf');
    };

    var generatePdf = function(fontUrl){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', fontUrl, true);
      xhr.responseType = 'arraybuffer'; //or 'blob'

      xhr.onload = function(e) {
        if (this.status === 200) {
          buildPdf(this.response);
        } else {
          console.error('Cannot load file. Status code: ' + this.status);
        }
      };
      xhr.send();
    },
    buildPdf = function(blobFile) {
      var doc = new PDFDocument({
          bufferPages: true,
          size: 'A4',
          margins: _margins
        }),
        stream = doc.pipe(blobStream());

      doc.options.pageAdded = function(options) {
        drawLines(doc, _hLinesConfig[_selectedFont].baseLineY, _hLinesConfig[_selectedFont].xHeightLineDiference);
      };
      stream.on('finish', function() {
        window.open(stream.toBlobURL('application/pdf'));
      });

      drawLines(doc, _hLinesConfig[_selectedFont].baseLineY, _hLinesConfig[_selectedFont].xHeightLineDiference);

      doc.fontSize(_fontSize);
      doc.lineGap(_hLinesConfig[_selectedFont].gap); //37
      doc.fillColor('#888888');
      doc.font(blobFile).text($printableText.val());

      doc.title = 'Calligraphy Copybook';
      doc.author = 'Bruno Monteiro - b\'uno';
      doc.subject = 'Calligraphy Copybook - www.buno.com.br';
      doc.keywords = 'calligraphy, copybook, caderno, caligrafia';

      doc.end();
    },
    drawVerticalLine = function(doc) {
      doc.lineWidth(_lineWidth);
      doc.strokeColor('#F8D3D3');

      doc.moveTo(_verticalLineMargin, 0);
      doc.lineTo(_verticalLineMargin, doc.page.height);
      doc.stroke();
    },
    drawHorizontalLine = function(doc, y, color) {
      doc.lineWidth(_lineWidth);
      doc.strokeColor(color);
      doc.moveTo(0, y);
      doc.lineTo(doc.page.width, y);
      doc.stroke();
    },
    drawLines = function(doc, baseLineY, xHeightLineDiference) {
      var maxLines = parseInt(doc.page.height / baseLineY);

      drawVerticalLine(doc);

      for (var i = 1; i <= maxLines; i++) {
        var currentLineY = baseLineY * i;
        drawHorizontalLine(doc, currentLineY, '#DFE8EC');
        drawHorizontalLine(doc, currentLineY - xHeightLineDiference, '#EEF3F5');
      }
    };
  }

  function changeFont(e) {
    if (e) {
      e.preventDefault();
    }

    var $this = $(this);

    if($this.attr('disabled')){
      return false;
    }

    var fontFamily = $this.attr(_fontFamilyAttr);
    var currentFontFamily = $copybook.attr('class').split(' ').filter(function(_class) {
      return _class.indexOf(_fontClassSuffix) > 0;
    });

    if (currentFontFamily.length) {
      for (var i in currentFontFamily) {
        $copybook.removeClass(currentFontFamily[i]);
      }
    }

    if (fontFamily && fontFamily.length) {
      $copybook.addClass($this.attr(_fontClassAttr));
    }

    _selectedFont = $this.attr(_dataFontAttr);
    $fontLinks.removeAttr(_selectedFontAttr);
    $this.attr(_selectedFontAttr, '');
    $('.button-collapse').sideNav('hide');

    $('.font-families-list li.active').removeClass('active');
    if(_selectedFont && _selectedFont.length){
      Materialize.toast($this.text() + ' selected', 5000, 'teal lighten-3');
      $this.parent().addClass('active');
    }
  }
  function changeText(e) {
    if (e) {
      e.preventDefault();
    }
    $copybook.find('.paper').html($(this).val().replace(/\n/g, '<br />'));
  }
  function insertDefaultText(e){
    if (e) {
      e.preventDefault();
    }
    var currentText = $printableText.val();
    $printableText.focus()
                  .val(currentText.trim().length ? currentText + '\n' + _defaultText : _defaultText)
                  .trigger('autoresize')
                  .trigger('change');
  }
  function showClearTextModal(e){
    if (e) {
      e.preventDefault();
    }

    if($printableText.val().trim().length){
      $clearTextModal.openModal();
    }
  }
  function closeClearTextModal(e){
    if (e) {
      e.preventDefault();
    }
    $clearTextModal.closeModal();
  }
  function clearText(e){
    if (e) {
      e.preventDefault();
    }

    $printableText.val('')
                  .trigger('autoresize')
                  .trigger('change');
    closeClearTextModal();
  }
  function collapsibleClick(e) {
    if (e) {
      e.preventDefault();
    }
    $( $(this).data('click') ).trigger('click');
  }

  function configPDFDocument() {
    PDFDocument.prototype._addPage = PDFDocument.prototype.addPage;

    PDFDocument.prototype.addPage = function(options) {
      this._addPage(options);

      if (typeof this.options.pageAdded === 'function') {
        this.options.pageAdded(options);
      }
      return this;
    };
  }

  function init(){
    var pdfBuilder = new PDFBuilder();
    configPDFDocument();
    $fontLinks.click(changeFont);
    $printableText.on('change keyup', changeText);
    $('.print-pdf').click(pdfBuilder.printPdf);
    $('.insert-default-text').click(insertDefaultText);
    $('.clear-text').click(showClearTextModal);
    $('.modal-action.yes', $clearTextModal).click(clearText);
    $('.modal-action.no', $clearTextModal).click(closeClearTextModal);
    $('main, #slide-out').niceScroll({autohidemode: 'leave', cursorcolor: '#5c6bc0'});
    $('.button-collapse').sideNav({edge: 'left'});
    //collapsible
    $('[data-click]').on('click', collapsibleClick);

    $('.modal-trigger').leanModal();
  }

  $(document).ready(init);
}(document, window, jQuery));
