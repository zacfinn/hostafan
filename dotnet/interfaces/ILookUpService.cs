//Proprietary code removed
using System.Collections.Generic;
using System.Dynamic;

namespace //Proprietary code removed
{
    public interface ILookUpService
    {
        List<LookUp> GetAll(string tableName);

        ExpandoObject GetTypes(string[] types);
    }
}
