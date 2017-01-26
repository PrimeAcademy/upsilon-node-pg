// doc ready function
$(function(){
  console.log('document loaded');

  getBooks();

  // listen for a submit event on the form
  $('#book-form').on('submit', addBook);
  $('#book-list').on('click', '.save', updateBook);

});

function getBooks() {
  $.ajax({
    url: '/books',
    type: 'GET',
    success: displayBooks
  });
}

function displayBooks(books) {
  console.log('Got books from the server', books);

  $('#book-list').empty();

  books.forEach(function(book){
    var $li = $('<li></li>');

    var $form = $('<form></form>');

    // <input type="text" name="title" value="Infinite Jest" />
    $form.append('<input type="text" name="title" value="' + book.title + '"/>');
    $form.append('<input type="text" name="author" value="' + book.author + '"/>');

    // ISO format: yyyy-mm-ddThh-mm-ssZ
    // desired format:  yyyy-mm-dd
    var date = new Date(book.publication_date).toISOString().slice(0,10);

    $form.append('<input type="date" name="published" value="' + date + '"/>');

    var $button = $('<button class="save">Save!</button>');
    $button.data('id', book.id);
    $form.append($button);

    $li.append($form);
    $('#book-list').append($li);
  });
}

function addBook(event) {
  // prevent browser from refreshing
  event.preventDefault();

  // get the info out of the form
  var formData = $(this).serialize();

  // send data to server
  $.ajax({
    url: '/books',
    type: 'POST',
    data: formData,
    success: getBooks
  });
}

function updateBook(event) {
  event.preventDefault();

  var $button = $(this);
  var $form = $button.closest('form');

  var data = $form.serialize();

  $.ajax({
    url: '/books/' + $button.data('id'),
    type: 'PUT',
    data: data,
    success: getBooks
  })
}
