<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Assignment App</title>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="../Assignment_Files/js/autocomplete.js"></script>
    <link rel="stylesheet" type="text/css" href="../Assignment_Files/css/assignment_styles.css">
    <meta http-equiv=”Pragma” content=”no-cache”>
    <meta http-equiv=”Expires” content=”-1″>
    <meta http-equiv=”CACHE-CONTROL” content=”NO-CACHE”>
  </head>
  <body>
    <nav class="navbar navbar-light">
      <a class="navbar-brand" href="https://spencerart.ku.edu/" target="_blank">
        <img src="../Assignment_Files/images/SPENCERMUSEUMKU.png" class="logo" alt="Spencer Museum of Art Logo">
      </a>
    </nav>
    <div class="container text-center">
      <h1 class="mt-5">Testing Data</h1>
      <div class="row m-3">
        <div class="col-md">
          <h3>Skills Used</h3>
          <input class="text-center" type="text" id="autocompleteSkills" placeholder="Search Skills">
        </div>
        <div class="col-md">
          <h3>Keywords</h3>
          <input class="text-center" type="text" id="autocompleteKeywords" placeholder="Search Keywords">
        </div>
      </div>
      <div class="row m-3">
        <div class="col-md">
          <h3>Acivity Type</h3>
          <input class="text-center" type="text" id="autocompleteActivity" placeholder="Search Activity Type">
        </div>
        <div class="col-md">
          <h3>Class Size</h3>
          <input class="text-center" type="text" id="autocompleteSize" placeholder="Search Class Size">
        </div>
      </div>
      <div class="row m-3">
        <div class="col-md">
          <h3>Academic Level</h3>
          <input class="text-center" type="text" id="autocompleteLevel" placeholder="Search Academic Level">
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>
    <!-- <div class="autocomplete-suggestions">
    <div class="autocomplete-group"><strong>NHL</strong></div>
    <div class="autocomplete-suggestion autocomplete-selected">...</div>
    <div class="autocomplete-suggestion">...</div>
    <div class="autocomplete-suggestion">...</div> -->
    <div class="container">
      <div class="row">
        <div class="col-md m-3 text-center">
          <button type="button" class="btn btn-outline-secondary m-2" id="resetSearch">Reset Search</button>
          <button type="button" class="btn btn-dark m-2" id="submitCall">Submit</button>
        </div>
      </div>
    </div>
    <div class="post" id="post">
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md m-5 p-2 text-center">
          <a href="https://deptsec.ku.edu/~spencerart/forms/form/7" target="_blank"><h1>Not finding what you want or want to schedule a class visit?</h1></a>
        </div>
      </div>
    </div>

<!-- Modal to alert users no results were found. Use bootstrap docs if needed -->
    <div class="modal fade" id="noResultsMessage" tabindex="-1" role="dialog" aria-labelledby="noResultsMessage" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="noResult">We're Sorry</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Your search criteria did not find any results. Please try again with different search terms.
            <div class="row">
              <div class="col-md m-3 text-center">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </body>
    <script src="../Assignment_Files/js/assignment_main.js"></script>
</html>
