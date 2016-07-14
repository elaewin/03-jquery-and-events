'use strict';

// this will contain our view-related methods

// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.

var articleView = {};

articleView.populateFilters = function () {
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);

    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function () {
  $('#author-filter').on('change', function() {
    if($(this).val()) {
      var $author = $(this).val();
      $('article').hide();
      $('article').each(function() {
        if ($(this).attr('author') === $author) {
          $(this).fadeIn();
        }
      });
    } else {
      $('article').not('.template').fadeIn();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function () {
  $('#category-filter').on('change', function () {
    if($(this).val()) {
      var $cat = $(this).val();
      $('article').hide();
      $('article').each(function() {
        if ($(this).attr('data-category') === $cat) {
          $(this).fadeIn();
        }
      });
    } else {
      $('article').not('.template').fadeIn();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    var $dataContent = $(this).attr('data-content');
    $('section.tab-content').hide();
    $('section.tab-content').each(function() {
      if ($(this).attr('id') === $dataContent) {
        $(this).fadeIn();
      }
    });
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function () {
  /* Hide any elements after the first two (<p> tags in this case) in any
     article body. */

  $('article').each(function() {
    $('.article-body *:nth-of-type(n+2)').hide();
    $(this).removeClass('show');
  });

  $('article a').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var $selection = $(e.target).prev();
    $selection.addClass('show');
    $('.show *:nth-of-type(n+2)').fadeIn();
  });

  /* TODO: Add a delegated event handler to reveal the entire article
     (the remaining paragraphs). When a .read-on link is clicked, we can:
     1. Prevent the default action of a link.
     2. Reveal everything in that *particular* article now.
     3. Hide that read-on link.
     4. Stretch Goal: Change the "Read On" link to display "Show Less" */
};

//TODO: Invoke all of the above functions (methods):
articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();
articleView.setTeasers();
