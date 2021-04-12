using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;

namespace //Proprietary code removed
{
    public class Listing
    {
        public int Id { get; set; }

        public LookUp ServiceType { get; set; }

        public int ServiceProfileId { get; set; }

        public string InternalName { get; set; }

        public string Title { get; set; }

        public string ShortDescription { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public UserDetail CreatedBy { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public Event Event { get; set; }

        public ExpandoObject ListingProfile { get; set; }

        public Location Location { get; set; }

        public bool AdditionalServices { get; set; }

        public List<AdditionalService> Services { get; set; }
    }
}
