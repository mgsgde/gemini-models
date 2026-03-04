(function () {
  var table = document.getElementById('models');
  if (!table) return;

  var thead = table.querySelector('thead th');
  var tbody = table.querySelector('tbody');
  var headers = table.querySelectorAll('th.sortable');

  /* Mark row with best price-performance (intelligence/price, paid models only) */
  function markBestValue() {
    var rows = tbody.querySelectorAll('tr');
    var bestRow = null;
    var bestRatio = -1;
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var price = getCellValue(row, 'price');
      if (price <= 0) continue;
      var intelligence = getCellValue(row, 'intelligence');
      var ratio = intelligence / price;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestRow = row;
      }
    }
    if (bestRow) {
      bestRow.classList.add('best-value');
      var firstCell = bestRow.querySelector('td');
      if (firstCell && !firstCell.querySelector('.badge-value')) {
        var badge = document.createElement('span');
        badge.className = 'badge badge-value';
        badge.setAttribute('title', 'Best intelligence per dollar');
        badge.textContent = 'Best value';
        firstCell.appendChild(document.createTextNode(' '));
        firstCell.appendChild(badge);
      }
    }
  }

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
    headers.forEach(function (th) {
      th.classList.remove('sort-asc', 'sort-desc');
      th.setAttribute('aria-sort', 'none');
    });
    if (activeTh) {
      activeTh.classList.add(dir === 'asc' ? 'sort-asc' : 'sort-desc');
      activeTh.setAttribute('aria-sort', dir === 'asc' ? 'ascending' : 'descending');
    }
  }

  var currentSort = { key: null, dir: 'asc' };

  headers.forEach(function (th) {
    th.setAttribute('role', 'button');
    th.setAttribute('tabindex', '0');
    th.setAttribute('aria-sort', 'none');

    function doSort() {
      var key = getSortKey(th);
      var dir = currentSort.key === key && currentSort.dir === 'asc' ? 'desc' : 'asc';
      currentSort = { key: key, dir: dir };
      sortBy(key, dir);
      updateHeaderState(th, dir);
    }

    th.addEventListener('click', doSort);
    th.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        doSort();
      }
    });
  });

  markBestValue();
})();
