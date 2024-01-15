
namespace PhotoPortal.ASP.Data
{
    public class LocalFileStorage : IFileStorage
    {
        private string wwwRootPath { get => Path.GetFullPath("wwwroot"); }
        public void CreateDirectory(string path)
        {
            Directory.CreateDirectory(Path.Combine(this.wwwRootPath, path));
        }

        public void SaveFile(string path, IFormFile file)
        {
            using (var stream = file.OpenReadStream())
            {
                byte[] buffer = new byte[file.Length];
                stream.Read(buffer, 0, (int)file.Length);
                string filename = Path.Combine(this.wwwRootPath, path);
                File.WriteAllBytes(Path.Combine("wwwroot", "images", filename), buffer);
            }
        }
    }
}
