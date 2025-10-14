export function normalizeMovies(items = []) {
  return items.map((m) => {
    const y = parseInt(String(m.year ?? "").trim(), 10);
    const d = parseInt(String(m.duration ?? "").trim(), 10);
    return {
    ...m,
    _title: (m.title || "").toLowerCase(),
    _desc: (m.description || "").toLowerCase(),
    _year: Number.isFinite(y) ? y : 0,
    _duration: Number.isFinite(d) ? d : 0,
}})
}


export function applyCriteria(normalized = [], criteria = {}) {
  const search = String(criteria.search ?? "").trim().toLowerCase();
  const yearRange = String(criteria.yearRange ?? "all").trim(); 
  const sort = String(criteria.sort ?? "year-desc").trim();
  let list = [...normalized];

  if (search) {
    list = list.filter((m) => m._title.includes(search) || m._desc.includes(search));
  }
 
  if (yearRange === "lte2000") {
    list = list.filter((m) => m._year <= 2000);
  } else if (yearRange === "2001-2015") {
    list = list.filter((m) => m._year >= 2001 && m._year <= 2015);
  } else if (yearRange === "gte2016") {
    list = list.filter((m) => m._year >= 2016);
  }


  const [key, dir] = sort.split("-");
  const get = (m) => (key === "year" ? m._year : key === "title" ? m._title : m._duration);
  list.sort((a, b) => {
    const va = get(a), vb = get(b);
    if (va < vb) return dir === "asc" ? -1 : 1;
    if (va > vb) return dir === "asc" ? 1 : -1;
    return 0;
  });


  return list.map(({ _title, _desc, _year, _duration, ...rest }) => rest);
}


export function paginate(list, page = 1, pageSize = 9) {
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    total,
    totalPages,
    page: current,
    items: list.slice(start, start + pageSize),
  };
}
