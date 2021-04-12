//Proprietary code removed
using System.Collections.Generic;
using System.Dynamic;

namespace //Proprietary code removed
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
