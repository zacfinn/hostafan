using Sabio.Models.Domain;
using System.Collections.Generic;
using System.Dynamic;

namespace Sabio.Services
{
    public interface ILookUpService
    {
        List<LookUp> GetAll(string tableName);

        ExpandoObject GetTypes(string[] types);
    }
}