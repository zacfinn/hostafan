using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class EventCategory : LookUp
    {
        public int EventTypeId { get; set; }
    }
}
