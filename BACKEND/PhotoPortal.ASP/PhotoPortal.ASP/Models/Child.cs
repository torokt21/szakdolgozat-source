﻿using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A class representing a child.
    /// </summary>
    public class Child
    {
        /// <summary>
        /// The id of the child.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The id of the institution the child belongs to.
        /// </summary>
        public int InstitutionId { get; set; }

        /// <summary>
        /// The institution the child belongs to.
        /// </summary>
        public Institution Institution { get; set; }

        /// <summary>
        /// The pictures taken of the child.
        /// </summary>
        public List<Picture> Pictures { get; }
    }
}
