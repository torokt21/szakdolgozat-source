using Microsoft.EntityFrameworkCore;

namespace PhotoPortal.ASP.Data
{
    public class GenericRepository<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        private DbSet<T> table = null;

        public GenericRepository(ApplicationDbContext context)
        {
            this._context = context;
            table = _context.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return table.ToList();
        }

        public T GetById(object id)
        {
            return table.Find(id);
        }

        public void Insert(T obj)
        {
            table.Add(obj);
            this.Save();
        }


        public void Update(T obj)
        {
            table.Attach(obj);
            _context.Entry(obj).State = EntityState.Modified;
            this.Save();
        }

        public void Delete(object id)
        {
            T existing = table.Find(id);
            table.Remove(existing);
            this.Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
