using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace smartfolio2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoinController : ControllerBase
    {
        private readonly ILogger<CoinController> _logger;

        public CoinController(ILogger<CoinController> logger)
        {
            _logger = logger;
        }

        private static readonly Dictionary<string, object> Coins = new Dictionary<string, object>
        {
            { "BTC", new { CoinName = "Bitcoin", Symbol = "BTC", CurrentPrice = 35000.00, Change = -10} },
            { "ETH", new { CoinName = "Ethereum", Symbol = "ETH", CurrentPrice = 2500.00, Change = 21} },
            { "LTC", new { CoinName = "Litecoin", Symbol = "LTC", CurrentPrice = 150.00, Change = -3 } },
            // Add more coins as needed
        };

        [HttpGet("{coinName}", Name = "GetCoinInfo")]
        public IActionResult GetCoin(string coinName)
        {
            coinName = coinName.ToUpper();

            if (Coins.ContainsKey(coinName))
            {
                var coinInfo = Coins[coinName];
                return Ok(coinInfo);
            }
            else
            {
                return NotFound(); // Return 404 if the coin is not found
            }
        }
    }
}
