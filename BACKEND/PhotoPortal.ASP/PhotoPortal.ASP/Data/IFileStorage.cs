namespace PhotoPortal.ASP.Data
{
    public interface IFileStorage
    {
        /// <summary>
        /// Creates a directory for the given path.
        /// </summary>
        /// <param name="path">The path of the directory.</param>
        void CreateDirectory (string path);

        void SaveFile(string path, IFormFile file);
    }
}
