using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests
{
    public class ListingUpdateRequest : ListingAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
