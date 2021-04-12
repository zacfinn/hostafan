using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System.Collections.Generic;
using System.Dynamic;

namespace Sabio.Services
{
    public interface IListingService
    {
        ExpandoObject Get(int id);

        Paged<Listing> GetAll(int pageIndex, int pageSize);

        Paged<Listing> Search(int pageIndex, int pageSize, string query);

        Paged<Listing> SearchByLocation(int pageIndex, int pageSize, double lat, double lng, int radius);

        int Add(ListingAddRequest model, int userId);

        void Update(ListingUpdateRequest model);
    }
}