using FluentFTP;
using Microsoft.AspNetCore.Http;
using PhotoPortal.ASP.Models;
using System.Net;

namespace PhotoPortal.ASP.Data
{
    public class FTPFileStorage : IFileStorage, IFtpLogger
    {
        private readonly FtpClient client;
        private readonly string basePath;
        private readonly ILogger _logger;

        [ActivatorUtilitiesConstructor]
        public FTPFileStorage(IConfiguration config, ILogger<FTPFileStorage> _logger)
        {
            this.basePath = config["FTP:Basepath"].Trim('/') + "/";
            this.client = new FtpClient(config["FTP:Host"], config["FTP:Username"], config["FTP:Password"], config.GetValue<int>("FTP:Port"), logger: this);
            client.AutoConnect();
        }

        public void CreateDirectory(string path)
        {
            this.client.CreateDirectory(this.basePath + path);
        }

        public void Log(FtpLogEntry entry)
        {
            Console.WriteLine(entry.Message);
        }

        public void SaveFile(string path, IFormFile file)
        {
            using (var stream = file.OpenReadStream())
            {
                client.UploadStream(stream, this.basePath + path);
            }
        }
    }
}
