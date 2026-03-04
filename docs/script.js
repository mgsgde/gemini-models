(function () {
  var table = document.getElementById('models');
  if (!table) return;

  var thead = table.querySelector('thead th');
  var tbody = table.querySelector('tbody');
  var headers = table.querySelectorAll('th.sortable');

  function getSortKey(th) {
    return th.getAttribute('data-sort');
  }

  function getCellValue(row, key) {
    var attr = row.getAttribute('data-' + key);
    return attr === null ? '' : parseFloat(attr, 10);
  }

  function sortBy(key, dir) {
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
    rows.sort(function (a, b) {
      var va = getCellValue(a, key);
      var vb = getCellValue(b, key);
      if (va < vb) return dir === 'asc' ? -1 : 1;
      if (va > vb) return dir === 'asc' ? 1 : -1;
      return 0;
    });
    rows.forEach(function (row) { tbody.appendChild(row); });
  }

  function updateHeaderState(activeTh, dir) {
    headers.forEach(function (h) {
      h.classList.remove('sort-asc', 'sort-desc');
      h.setAttribute('aria-sort', 'none');
    });
    if (activeTh) {
      activeTh.classList.add(dir === 'asc' ? 'sort-asc' : 'sort-desc');
      activeTh.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
    }
  }

  var currentSort = { key: 'release', dir: 'desc' };
  var releaseTh = table.querySelector('th[data-sort="release"]');

  function applySort() {
    sortBy(currentSort.key, currentSort.dir);
    var activeTh = table.querySelector('th[data-sort="' + currentSort.key + '"]');
    updateHeaderState(activeTh, currentSort.dir);
  }

  applySort();

  headers.forEach(function (th) {
    th.setAttribute('role', 'button');
    th.setAttribute('tabindex', '0');
    th.setAttribute('aria-sort', 'none');

    function doSort() {
      var key = getSortKey(th);
      if (currentSort.key === key) {
        if (currentSort.dir === 'asc') {
          currentSort = { key: key, dir: 'desc' };
          sortBy(key, 'desc');
          updateHeaderState(th, 'desc');
        } else {
          currentSort = { key: 'release', dir: 'desc' };
          sortBy('release', 'desc');
          updateHeaderState(releaseTh, 'desc');
        }
      } else {
        currentSort = { key: key, dir: 'asc' };
        sortBy(key, 'asc');
        updateHeaderState(th, 'asc');
      }
    }

    th.addEventListener('click', doSort);
    th.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        doSort();
      }
    });
  });
})();
