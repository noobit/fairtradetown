---
layout: map
permalink: /
---


<!-- 
* index.md auseinanderfriemeln, je nach Layout/Design Entscheidung
* PruneCluster: Cluster nach Bezirk (v2.0)
* backend
-->

<!-- PLZ: http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_postleit?
REQUEST=GetCapabilities&SERVICE=WFS&VERSION=1.1.0-->

<div id="map"></div>


<!-- <div id="sidebar">
  <div class="sidebar-wrapper">
    <div class="panel panel-default" id="features">
      <div class="panel-heading">
        <h3 class="panel-title">Points of Interest
        <button type="button" class="btn btn-xs btn-default pull-right" id="sidebar-hide-btn"><i class="fa fa-chevron-left"></i></button></h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-xs-8 col-md-8">
            <input type="text" class="form-control search" placeholder="Filter" />
          </div>
          <div class="col-xs-4 col-md-4">
            <button type="button" class="btn btn-primary pull-right sort" data-sort="feature-name" id="sort-btn"><i class="fa fa-sort"></i>&nbsp;&nbsp;Sort</button>
          </div>
        </div>
      </div>
      <div class="sidebar-table">
        <table class="table table-hover" id="feature-list">
          <thead class="hidden">
            <tr>
              <th>Icon</th>
            <tr>
            <tr>
              <th>Name</th>
            <tr>
            <tr>
              <th>Chevron</th>
            <tr>
          </thead>
          <tbody class="list"></tbody>
        </table>
      </div>
    </div>
  </div>
</div> -->

<div id="loading">
  <div class="loading-indicator">
    <div class="progress progress-striped active">
      <div class="progress-bar progress-bar-info progress-bar-full"></div>
    </div>
  </div>
</div>

<div class="modal fade" id="aboutModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Fair einkaufen in Berlin!</h4>
      </div>
      <div class="modal-body">
        <ul class="nav nav-tabs" id="aboutTabs">
          <li class="active"><a href="#about" data-toggle="tab"><i class="fa fa-question-circle"></i>&nbsp;Über das Projekt</a></li>
          <li><a href="#contact" data-toggle="tab"><i class="fa fa-envelope"></i>&nbsp;Kontakt</a></li>
          <li><a href="#disclaimer" data-toggle="tab"><i class="fa fa-exclamation-circle"></i>&nbsp;Impressum</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-globe"></i>&nbsp;Metadata <b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="#boroughs-tab" data-toggle="tab">Bezirke / Ortsteile</a></li>
              <li><a href="#subway-lines-tab" data-toggle="tab">Marker</a></li>
            </ul>
          </li>
        </ul>
        <div class="tab-content" id="aboutTabsContent">
          <div class="tab-pane fade active in" id="about">
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua...</p>
            <div class="panel panel-primary">
              <div class="panel-heading">Zusammenfassung</div>
              <ul class="list-group">
                <li class="list-group-item">Unterpunkte</li>
                <li class="list-group-item">Vielleicht so ein Layout...</li>
                <li class="list-group-item">Logical multiple layer marker clustering via the <a href="https://github.com/" target="_blank">...plugin</a></li>
              </ul>
            </div>
          </div>
          <div id="disclaimer" class="tab-pane fade text-danger">
            <p>Lorem ipsum.</p>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
          </div>
          <div class="tab-pane fade" id="contact">
            <form id="contact-form">
              <div class="well well-sm">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="first-name">Name</label>
                      <input type="text" class="form-control" id="first-name">
                    </div>
                    <!-- <div class="form-group">
                      <label for="last-name">Nachame:</label>
                      <input type="text" class="form-control" id="last-email">
                    </div> -->
                    <div class="form-group">
                      <label for="email">E-Mail-Adresse:</label>
                      <input type="text" class="form-control" id="email">
                    </div>
                  </div>
                  <div class="col-md-8">
                    <label for="message">Nachricht:</label>
                    <textarea class="form-control" rows="8" id="message"></textarea>
                  </div>
                  <div class="col-md-12">
                    <p>
                      <button type="submit" class="btn btn-primary pull-right" data-dismiss="modal">Senden</button>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="tab-pane fade" id="boroughs-tab">
            <p>Borough ... <a href="http://www.nyc.gov/html/dcp/html/bytes/meta_dis_nyboroughwi.shtml" target="_blank">New York City Department of City Planning</a></p>
          </div>
        </div>
      </div>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div> -->
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!--<div class="modal fade" id="legendModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Map Legend</h4>
      </div>
      <div class="modal-body">
        <p>Map Legend goes here...</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div> -->

<!-- <div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Login</h4>
      </div>
      <div class="modal-body">
        <form id="contact-form">
          <fieldset>
            <div class="form-group">
              <label for="name">Username:</label>
              <input type="text" class="form-control" id="username">
            </div>
            <div class="form-group">
              <label for="email">Password:</label>
              <input type="password" class="form-control" id="password">
            </div>
          </fieldset>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary" data-dismiss="modal">Login</button>
      </div>
    </div>
  </div
</div> -->

<div class="modal fade" id="featureModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title text-primary" id="feature-title"></h4>
      </div>
      <div class="modal-body" id="feature-info"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="attributionModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">
          Developed by roman</a>
        </h4>
      </div>
      <div class="modal-body">
        <div id="attribution"></div>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
