using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
//Proprietary code removed
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace //Proprietary code removed
{
    [Route("api/lookups")]
    [ApiController]
    public class LookUpApiController : BaseApiController
    {
        private ILookUpService _service = null;
        private IAuthenticationService<int> _authService = null;
        public LookUpApiController(ILookUpService service
            , ILogger<LookUpApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<ExpandoObject>> GetAll(string[] types)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                ExpandoObject obj = _service.GetTypes(types);

                if (obj == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<ExpandoObject> { Item = obj };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

    }
}
