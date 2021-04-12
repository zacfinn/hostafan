//Proprietary code removed
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Text;
using System.Text.RegularExpressions;

namespace //Proprietary code removed
{
    public class LookUpService : ILookUpService
    {
        IDataProvider _data = null;

        public LookUpService(IDataProvider data)
        {
            _data = data;
        }

        public ExpandoObject GetTypes(string[] types)
        {
            var resultObj = new ExpandoObject();
     
            foreach (var type in types)
            {
                switch (type)
                {
                    case "AccessTypes":
                        resultObj.TryAdd("accessTypes", GetAccessType(type));
                        break;
                    case "EventCategories":
                        resultObj.TryAdd("eventCategories", GetEventCategory(type));
                        break;
                    case "States":
                        resultObj.TryAdd("states", GetLookUp3Col(type));
                        break;
                    case "Languages":
                        resultObj.TryAdd("languages", GetLookUp3Col(type));
                        break;
                    default:
                        resultObj.TryAdd(ToCamelCase(type), GetAll(type));
                        break;
                }
            }
            return resultObj;
        }

        public List<LookUp> GetAll(string tableName)
        {
            List<LookUp> list = null;
            string procName = $"[dbo].[{tableName}_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                LookUp lookUp = MapLookUp(reader);

                if (list == null)
                {
                    list = new List<LookUp>();
                }

                list.Add(lookUp);
            });
            return list;
        }

        public List<AccessType> GetAccessType(string tableName)
        {
            List<AccessType> list = null;
            string procName = $"[dbo].[{tableName}_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                AccessType lookUp = MapAccessType(reader);

                if (list == null)
                {
                    list = new List<AccessType>();
                }

                list.Add(lookUp);
            });
            return list;
        }

        public List<EventCategory> GetEventCategory(string tableName)
        {
            List<EventCategory> list = null;
            string procName = $"[dbo].[{tableName}_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                EventCategory lookUp = MapEventCategory(reader);

                if (list == null)
                {
                    list = new List<EventCategory>();
                }

                list.Add(lookUp);
            });
            return list;
        }

        public List<LookUp3Col> GetLookUp3Col(string tableName)
        {
            List<LookUp3Col> list = null;
            string procName = $"[dbo].[{tableName}_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                LookUp3Col lookUp = MapLookUp3Col(reader);

                if (list == null)
                {
                    list = new List<LookUp3Col>();
                }

                list.Add(lookUp);
            });
            return list;
        }

        private static LookUp MapLookUp(IDataReader reader)
        {
            LookUp lookUp = new LookUp();
            int idx = 0;

            lookUp.Id = reader.GetSafeInt32(idx++);
            lookUp.Name = reader.GetSafeString(idx++);

            return lookUp;
        }

        private static AccessType MapAccessType(IDataReader reader)
        {
            AccessType lookUp = new AccessType();
            int idx = 0;

            lookUp.Id = reader.GetSafeInt32(idx++);
            lookUp.Name = reader.GetSafeString(idx++);
            lookUp.Description = reader.GetSafeString(idx++);

            return lookUp;
        }

        private static EventCategory MapEventCategory(IDataReader reader)
        {
            EventCategory lookUp = new EventCategory();
            int idx = 0;

            lookUp.Id = reader.GetSafeInt32(idx++);
            lookUp.EventTypeId = reader.GetSafeInt32(idx++);
            lookUp.Name = reader.GetSafeString(idx++);

            return lookUp;

        }

        private static LookUp3Col MapLookUp3Col(IDataReader reader)
        {
            LookUp3Col lookUp = new LookUp3Col();
            int idx = 0;

            lookUp.Id = reader.GetSafeInt32(idx++);
            lookUp.Code = reader.GetSafeString(idx++);
            lookUp.Name = reader.GetSafeString(idx++);

            return lookUp;
        }

//Proprietary code removed
    }
}
