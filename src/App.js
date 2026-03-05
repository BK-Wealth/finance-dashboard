import { useState, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const SEED_DATA = [{"Date":"2019-03","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":89412.0421,"Monthly return":0.0,"Cumm Return":0.0,"Ann Return":0},{"Date":"2019-04","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":93551.29,"Monthly return":0.0463,"Cumm Return":0.0463,"Ann Return":0.7213},{"Date":"2019-05","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":94362.3032,"Monthly return":0.0087,"Cumm Return":0.0554,"Ann Return":0.3817},{"Date":"2019-06","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":101005.0452,"Monthly return":0.0704,"Cumm Return":0.1297,"Ann Return":0.6285},{"Date":"2019-07","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":102722.2415,"Monthly return":0.017,"Cumm Return":0.1489,"Ann Return":0.5164},{"Date":"2019-08","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":103389.356,"Monthly return":0.0065,"Cumm Return":0.1563,"Ann Return":0.4171},{"Date":"2019-09","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":106452.3781,"Monthly return":0.0296,"Cumm Return":0.1906,"Ann Return":0.4175},{"Date":"2019-10","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":108373.3974,"Monthly return":0.018,"Cumm Return":0.2121,"Ann Return":0.3906},{"Date":"2019-11","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":117589.5148,"Monthly return":0.085,"Cumm Return":0.3151,"Ann Return":0.5082},{"Date":"2019-12","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":123786.8784,"Monthly return":0.0527,"Cumm Return":0.3845,"Ann Return":0.543},{"Date":"2020-01","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":131524.3254,"Monthly return":0.0625,"Cumm Return":0.471,"Ann Return":0.589},{"Date":"2020-02","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":131207.2258,"Monthly return":-0.0024,"Cumm Return":0.4674,"Ann Return":0.5195},{"Date":"2020-03","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":135000.0,"Monthly return":0.0289,"Cumm Return":0.5099,"Ann Return":0.5099},{"Date":"2020-04","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":123500.0,"Monthly return":-0.0852,"Cumm Return":0.3812,"Ann Return":0.3474},{"Date":"2020-05","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":128722.0,"Monthly return":0.0423,"Cumm Return":0.4396,"Ann Return":0.3666},{"Date":"2020-06","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":134785.9167,"Monthly return":0.0471,"Cumm Return":0.5075,"Ann Return":0.3887},{"Date":"2020-07","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":138820.7288,"Monthly return":0.0299,"Cumm Return":0.5526,"Ann Return":0.3909},{"Date":"2020-08","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":155732.2641,"Monthly return":0.1218,"Cumm Return":0.7417,"Ann Return":0.4795},{"Date":"2020-09","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":163143.794,"Monthly return":0.0476,"Cumm Return":0.8246,"Ann Return":0.4932},{"Date":"2020-10","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":172245.6017,"Monthly return":0.0558,"Cumm Return":0.9264,"Ann Return":0.513},{"Date":"2020-11","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":185900.3599,"Monthly return":0.0793,"Cumm Return":1.0791,"Ann Return":0.5514},{"Date":"2020-12","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":203361.9313,"Monthly return":0.0939,"Cumm Return":1.2744,"Ann Return":0.5993},{"Date":"2021-01","EE":null,"Stake":null,"SPV":null,"EVP":null,"Crypto":null,"Super":null,"Watch":null,"Ring":null,"Gold":null,"Cash":null,"Total":204931.4094,"Monthly return":0.0077,"Cumm Return":1.292,"Ann Return":0.5721},{"Date":"2021-02","EE":63973.06,"Stake":28244.0,"SPV":0.0,"EVP":0.0,"Crypto":0.0,"Super":12894.0,"Watch":55416.0,"Ring":13000.0,"Gold":0.0,"Cash":30055.0,"Total":203582.06,"Monthly return":-0.0066,"Cumm Return":1.2769,"Ann Return":0.5362},{"Date":"2021-03","EE":75914.81,"Stake":27638.0,"SPV":0.0,"EVP":0.0,"Crypto":0.0,"Super":14134.0,"Watch":55865.0,"Ring":13000.0,"Gold":0.0,"Cash":29239.0,"Total":215790.81,"Monthly return":0.06,"Cumm Return":1.4134,"Ann Return":0.5535},{"Date":"2021-04","EE":94753.29,"Stake":31783.0,"SPV":0.0,"EVP":0.0,"Crypto":0.0,"Super":15889.0,"Watch":58685.0,"Ring":13000.0,"Gold":0.0,"Cash":32368.0,"Total":246478.29,"Monthly return":0.1422,"Cumm Return":1.7567,"Ann Return":0.627},{"Date":"2021-05","EE":97359.0,"Stake":33583.0,"SPV":0.0,"EVP":0.0,"Crypto":0.0,"Super":16897.0,"Watch":61437.0,"Ring":13000.0,"Gold":0.0,"Cash":31153.0,"Total":253429,"Monthly return":0.0282,"Cumm Return":1.8344,"Ann Return":0.6174},{"Date":"2021-06","EE":141254.55,"Stake":38378.0,"SPV":3000.0,"EVP":0.0,"Crypto":0.0,"Super":18498.0,"Watch":63807.0,"Ring":13000.0,"Gold":0.0,"Cash":28294.0,"Total":306231.55,"Monthly return":0.2084,"Cumm Return":2.4249,"Ann Return":0.7283},{"Date":"2021-07","EE":157425.41,"Stake":42469.0,"SPV":3000.0,"EVP":0.0,"Crypto":0.0,"Super":20184.0,"Watch":65546.0,"Ring":13000.0,"Gold":0.0,"Cash":19244.0,"Total":320868.41,"Monthly return":0.0478,"Cumm Return":2.5886,"Ann Return":0.7291},{"Date":"2021-08","EE":149606.0,"Stake":46178.71,"SPV":3000.0,"EVP":0.0,"Crypto":0.0,"Super":21913.0,"Watch":67222.0,"Ring":13000.0,"Gold":0.0,"Cash":20915.0,"Total":321834.71,"Monthly return":0.003,"Cumm Return":2.5995,"Ann Return":0.6989},{"Date":"2021-09","EE":169438.72,"Stake":50914.0,"SPV":3000.0,"EVP":0.0,"Crypto":0.0,"Super":22866.0,"Watch":67121.0,"Ring":13000.0,"Gold":0.0,"Cash":27793.0,"Total":354132.72,"Monthly return":0.1004,"Cumm Return":2.9607,"Ann Return":0.7342},{"Date":"2021-10","EE":210821.05,"Stake":47117.0,"SPV":3000.0,"EVP":11400.0,"Crypto":0.0,"Super":24326.0,"Watch":66738.0,"Ring":13000.0,"Gold":0.0,"Cash":23781.0,"Total":400183.05,"Monthly return":0.13,"Cumm Return":3.4757,"Ann Return":0.7863},{"Date":"2021-11","EE":233272.0,"Stake":48936.0,"SPV":3000.0,"EVP":15000.0,"Crypto":1934.0,"Super":26156.0,"Watch":70275.0,"Ring":13000.0,"Gold":0.0,"Cash":26221.0,"Total":437794,"Monthly return":0.094,"Cumm Return":3.8964,"Ann Return":0.8143},{"Date":"2021-12","EE":242786.0,"Stake":47894.0,"SPV":3000.0,"EVP":15000.0,"Crypto":1701.0,"Super":28749.0,"Watch":71890.0,"Ring":13000.0,"Gold":0.0,"Cash":25000.0,"Total":449020,"Monthly return":0.0256,"Cumm Return":4.0219,"Ann Return":0.7983},{"Date":"2022-01","EE":324471.86,"Stake":44000.0,"SPV":3000.0,"EVP":15000.0,"Crypto":1241.0,"Super":28447.0,"Watch":75720.0,"Ring":13000.0,"Gold":0.0,"Cash":27200.0,"Total":532079.86,"Monthly return":0.185,"Cumm Return":4.9509,"Ann Return":0.8766},{"Date":"2022-02","EE":330055.0,"Stake":40706.0,"SPV":3000.0,"EVP":15000.0,"Crypto":1294.0,"Super":28916.06,"Watch":78817.0,"Ring":13000.0,"Gold":0.0,"Cash":20879.0,"Total":531667.06,"Monthly return":-0.0008,"Cumm Return":4.9463,"Ann Return":0.8427},{"Date":"2022-03","EE":338742.0,"Stake":42970.0,"SPV":11000.0,"EVP":15000.0,"Crypto":1424.0,"Super":29057.0,"Watch":78408.0,"Ring":13000.0,"Gold":0.0,"Cash":18143.0,"Total":547744,"Monthly return":0.0302,"Cumm Return":5.1261,"Ann Return":0.8298},{"Date":"2022-04","EE":337968.0,"Stake":41919.0,"SPV":11000.0,"EVP":18450.0,"Crypto":1367.0,"Super":31087.0,"Watch":79838.0,"Ring":13000.0,"Gold":0.0,"Cash":19913.0,"Total":554542,"Monthly return":0.0124,"Cumm Return":5.2021,"Ann Return":0.8073},{"Date":"2022-05","EE":298958.0,"Stake":40081.0,"SPV":11000.0,"EVP":18450.0,"Crypto":1019.0,"Super":30608.0,"Watch":80358.0,"Ring":13000.0,"Gold":0.0,"Cash":19495.0,"Total":512969,"Monthly return":-0.075,"Cumm Return":4.7371,"Ann Return":0.7362},{"Date":"2022-06","EE":274304.0,"Stake":39179.0,"SPV":11000.0,"EVP":18450.0,"Crypto":743.0,"Super":30050.0,"Watch":78440.0,"Ring":13000.0,"Gold":0.0,"Cash":23916.0,"Total":489082,"Monthly return":-0.0466,"Cumm Return":4.47,"Ann Return":0.6868},{"Date":"2022-07","EE":256850.04,"Stake":40282.0,"SPV":11000.0,"EVP":21000.0,"Crypto":772.0,"Super":32391.0,"Watch":75337.0,"Ring":13000.0,"Gold":0.0,"Cash":20015.0,"Total":470647.04,"Monthly return":-0.0377,"Cumm Return":4.2638,"Ann Return":0.6458},{"Date":"2022-08","EE":255000.0,"Stake":41895.0,"SPV":11000.0,"EVP":26250.0,"Crypto":756.0,"Super":34008.0,"Watch":70339.0,"Ring":13000.0,"Gold":0.0,"Cash":14968.0,"Total":467216,"Monthly return":-0.0073,"Cumm Return":4.2254,"Ann Return":0.6225},{"Date":"2022-09","EE":242649.43,"Stake":38886.0,"SPV":11000.0,"EVP":26250.0,"Crypto":756.0,"Super":34364.51,"Watch":74057.0,"Ring":13000.0,"Gold":0.0,"Cash":20346.29,"Total":461309.23,"Monthly return":-0.0126,"Cumm Return":4.1594,"Ann Return":0.5981},{"Date":"2022-10","EE":233517.32,"Stake":38837.0,"SPV":11000.0,"EVP":26250.0,"Crypto":747.0,"Super":35837.51,"Watch":75893.0,"Ring":13000.0,"Gold":0.0,"Cash":23703.0,"Total":458784.83,"Monthly return":-0.0055,"Cumm Return":4.1311,"Ann Return":0.5783},{"Date":"2022-11","EE":225120.64,"Stake":40550.74,"SPV":11000.0,"EVP":28500.0,"Crypto":599.0,"Super":39010.6,"Watch":72324.0,"Ring":13000.0,"Gold":0.0,"Cash":12050.87,"Total":442155.85,"Monthly return":-0.0362,"Cumm Return":3.9451,"Ann Return":0.5464},{"Date":"2022-12","EE":230445.59,"Stake":39133.0,"SPV":11000.0,"EVP":28500.0,"Crypto":613.0,"Super":40142.0,"Watch":74180.0,"Ring":13000.0,"Gold":0.0,"Cash":14424.0,"Total":451437.59,"Monthly return":0.021,"Cumm Return":4.049,"Ann Return":0.54},{"Date":"2023-01","EE":273611.52,"Stake":40175.0,"SPV":11000.0,"EVP":28500.0,"Crypto":806.0,"Super":42528.0,"Watch":71169.0,"Ring":13000.0,"Gold":0.0,"Cash":15843.0,"Total":496632.52,"Monthly return":0.1001,"Cumm Return":4.5544,"Ann Return":0.5641},{"Date":"2023-02","EE":212529.61,"Stake":39963.0,"SPV":11000.0,"EVP":33225.0,"Crypto":854.0,"Super":43779.0,"Watch":70778.0,"Ring":13000.0,"Gold":0.0,"Cash":17268.0,"Total":442396.61,"Monthly return":-0.1092,"Cumm Return":3.9478,"Ann Return":0.5042},{"Date":"2023-03","EE":196857.91,"Stake":39569.0,"SPV":11000.0,"EVP":33225.0,"Crypto":1013.0,"Super":44490.0,"Watch":71573.0,"Ring":13000.0,"Gold":0.0,"Cash":14201.0,"Total":424928.91,"Monthly return":-0.0395,"Cumm Return":3.7525,"Ann Return":0.4765},{"Date":"2023-04","EE":176413.09,"Stake":41307.25,"SPV":11000.0,"EVP":33225.0,"Crypto":1051.0,"Super":46647.0,"Watch":74010.0,"Ring":13000.0,"Gold":0.0,"Cash":12692.0,"Total":409345.34,"Monthly return":-0.0367,"Cumm Return":3.5782,"Ann Return":0.4515},{"Date":"2023-05","EE":151935.82,"Stake":32921.0,"SPV":11000.0,"EVP":33225.0,"Crypto":1051.0,"Super":47728.0,"Watch":72096.0,"Ring":13000.0,"Gold":0.0,"Cash":19303.0,"Total":382259.82,"Monthly return":-0.0662,"Cumm Return":3.2753,"Ann Return":0.4172},{"Date":"2023-06","EE":147150.04,"Stake":32735.0,"SPV":11000.0,"EVP":33225.0,"Crypto":1109.0,"Super":52331.0,"Watch":71758.0,"Ring":13000.0,"Gold":0.0,"Cash":37854.0,"Total":400162.04,"Monthly return":0.0468,"Cumm Return":3.4755,"Ann Return":0.4228},{"Date":"2023-07","EE":143562.11,"Stake":34336.0,"SPV":11000.0,"EVP":39100.0,"Crypto":1069.0,"Super":54152.0,"Watch":70598.0,"Ring":13000.0,"Gold":0.0,"Cash":36706.0,"Total":403523.11,"Monthly return":0.0084,"Cumm Return":3.5131,"Ann Return":0.4159},{"Date":"2023-08","EE":145088.16,"Stake":35631.0,"SPV":11000.0,"EVP":39100.0,"Crypto":983.0,"Super":56082.0,"Watch":71824.0,"Ring":13000.0,"Gold":0.0,"Cash":34565.0,"Total":407273.16,"Monthly return":0.0093,"Cumm Return":3.555,"Ann Return":0.4096},{"Date":"2023-09","EE":141862.11,"Stake":34545.0,"SPV":11000.0,"EVP":39100.0,"Crypto":1005.0,"Super":56179.51,"Watch":68825.0,"Ring":13000.0,"Gold":0.0,"Cash":31550.0,"Total":397066.62,"Monthly return":-0.0251,"Cumm Return":3.4409,"Ann Return":0.3928},{"Date":"2023-10","EE":112057.19,"Stake":33832.0,"SPV":11000.0,"EVP":44350.0,"Crypto":1358.0,"Super":56295.51,"Watch":69087.0,"Ring":13000.0,"Gold":0.0,"Cash":27156.0,"Total":368135.7,"Monthly return":-0.0729,"Cumm Return":3.1173,"Ann Return":0.3617},{"Date":"2023-11","EE":98268.09,"Stake":35357.0,"SPV":11000.0,"EVP":44350.0,"Crypto":1523.0,"Super":59067.0,"Watch":66575.0,"Ring":13000.0,"Gold":0.0,"Cash":18283.11,"Total":347423.2,"Monthly return":-0.0563,"Cumm Return":2.8856,"Ann Return":0.3376},{"Date":"2023-12","EE":110580.75,"Stake":36185.0,"SPV":11000.0,"EVP":44350.0,"Crypto":1527.0,"Super":62284.0,"Watch":65965.0,"Ring":13000.0,"Gold":0.0,"Cash":15218.0,"Total":360109.75,"Monthly return":0.0365,"Cumm Return":3.0275,"Ann Return":0.3408},{"Date":"2024-01","EE":95533.12,"Stake":31899.52,"SPV":11000.0,"EVP":44350.0,"Crypto":1480.0,"Super":65091.78,"Watch":65965.0,"Ring":13000.0,"Gold":0.0,"Cash":16714.0,"Total":345033.42,"Monthly return":-0.0419,"Cumm Return":2.8589,"Ann Return":0.3223},{"Date":"2024-02","EE":85874.45,"Stake":33428.0,"SPV":11000.0,"EVP":44350.0,"Crypto":1900.0,"Super":68917.78,"Watch":66014.0,"Ring":13000.0,"Gold":0.0,"Cash":14264.0,"Total":338748.23,"Monthly return":-0.0182,"Cumm Return":2.7886,"Ann Return":0.3112},{"Date":"2024-03","EE":103828.92,"Stake":34749.0,"SPV":11000.0,"EVP":48025.0,"Crypto":2643.0,"Super":72349.0,"Watch":66813.0,"Ring":13000.0,"Gold":0.0,"Cash":11215.0,"Total":363622.92,"Monthly return":0.0734,"Cumm Return":3.0668,"Ann Return":0.3239},{"Date":"2024-04","EE":139512.86,"Stake":23031.0,"SPV":11000.0,"EVP":48025.0,"Crypto":2506.0,"Super":71812.78,"Watch":66512.0,"Ring":13000.0,"Gold":0.0,"Cash":10200.33,"Total":385599.97,"Monthly return":0.0604,"Cumm Return":3.3126,"Ann Return":0.3331},{"Date":"2024-05","EE":124752.19,"Stake":24358.12,"SPV":11000.0,"EVP":48025.0,"Crypto":2545.0,"Super":74055.78,"Watch":65015.0,"Ring":13000.0,"Gold":0.0,"Cash":7175.11,"Total":369926.2,"Monthly return":-0.0406,"Cumm Return":3.1373,"Ann Return":0.3163},{"Date":"2024-06","EE":145289.78,"Stake":24784.0,"SPV":11000.0,"EVP":48025.0,"Crypto":2224.0,"Super":75568.78,"Watch":63512.0,"Ring":13000.0,"Gold":0.0,"Cash":4608.0,"Total":388011.56,"Monthly return":0.0489,"Cumm Return":3.3396,"Ann Return":0.3226},{"Date":"2024-07","EE":143690.46,"Stake":19359.0,"SPV":11000.0,"EVP":53100.0,"Crypto":2462.0,"Super":78121.0,"Watch":65895.0,"Ring":13000.0,"Gold":0.0,"Cash":8372.58,"Total":395000.04,"Monthly return":0.018,"Cumm Return":3.4177,"Ann Return":0.3212},{"Date":"2024-08","EE":149324.79,"Stake":19252.61,"SPV":11000.0,"EVP":54300.0,"Crypto":2308.0,"Super":79614.0,"Watch":65437.0,"Ring":13000.0,"Gold":0.0,"Cash":-2388.0,"Total":391848.4,"Monthly return":-0.008,"Cumm Return":3.3825,"Ann Return":0.3136},{"Date":"2024-09","EE":157590.48,"Stake":18730.0,"SPV":11000.0,"EVP":54300.0,"Crypto":2259.0,"Super":80928.0,"Watch":64461.0,"Ring":13000.0,"Gold":0.0,"Cash":65227.0,"Total":467495.48,"Monthly return":0.1931,"Cumm Return":4.2286,"Ann Return":0.3509},{"Date":"2024-10","EE":190328.39,"Stake":19143.0,"SPV":11000.0,"EVP":54300.0,"Crypto":2511.0,"Super":81911.0,"Watch":62655.0,"Ring":13000.0,"Gold":0.0,"Cash":51793.0,"Total":486641.39,"Monthly return":0.041,"Cumm Return":4.4427,"Ann Return":0.3545},{"Date":"2024-11","EE":220545.63,"Stake":19525.0,"SPV":11000.0,"EVP":54300.0,"Crypto":3623.0,"Super":83941.0,"Watch":62073.0,"Ring":13000.0,"Gold":0.0,"Cash":53200.0,"Total":521207.63,"Monthly return":0.071,"Cumm Return":4.8293,"Ann Return":0.3649},{"Date":"2024-12","EE":187071.93,"Stake":19835.0,"SPV":11000.0,"EVP":54300.0,"Crypto":3790.0,"Super":84851.0,"Watch":65024.0,"Ring":13000.0,"Gold":0.0,"Cash":80170.0,"Total":519041.93,"Monthly return":-0.0042,"Cumm Return":4.8051,"Ann Return":0.3578},{"Date":"2025-01","EE":180418.59,"Stake":19498.5,"SPV":11000.0,"EVP":55350.0,"Crypto":3790.0,"Super":87569.0,"Watch":66065.0,"Ring":13000.0,"Gold":0.0,"Cash":73577.0,"Total":510268.09,"Monthly return":-0.0169,"Cumm Return":4.7069,"Ann Return":0.3479},{"Date":"2025-02","EE":183343.12,"Stake":20880.0,"SPV":11000.0,"EVP":55350.0,"Crypto":3539.0,"Super":87883.0,"Watch":64875.0,"Ring":13000.0,"Gold":4621.0,"Cash":82530.0,"Total":527021.12,"Monthly return":0.0328,"Cumm Return":4.8943,"Ann Return":0.3496},{"Date":"2025-03","EE":182596.53,"Stake":20350.0,"SPV":11000.0,"EVP":55350.0,"Crypto":3406.0,"Super":87978.0,"Watch":66446.0,"Ring":13000.0,"Gold":4788.0,"Cash":83317.0,"Total":528231.53,"Monthly return":0.0023,"Cumm Return":4.9078,"Ann Return":0.3445},{"Date":"2025-04","EE":220535.15,"Stake":29384.0,"SPV":11000.0,"EVP":56260.0,"Crypto":3640.0,"Super":86541.0,"Watch":67969.0,"Ring":13000.0,"Gold":5233.0,"Cash":62515.0,"Total":556077.15,"Monthly return":0.0527,"Cumm Return":5.2193,"Ann Return":0.3504},{"Date":"2025-05","EE":225400.55,"Stake":30507.58,"SPV":11000.0,"EVP":56260.0,"Crypto":4095.0,"Super":91869.0,"Watch":67294.0,"Ring":13000.0,"Gold":5170.0,"Cash":62220.0,"Total":566816.13,"Monthly return":0.0193,"Cumm Return":5.3394,"Ann Return":0.3492},{"Date":"2025-06","EE":270176.91,"Stake":31262.0,"SPV":11000.0,"EVP":56260.0,"Crypto":4003.0,"Super":111534.0,"Watch":68049.0,"Ring":13000.0,"Gold":5119.0,"Cash":42157.0,"Total":612560.91,"Monthly return":0.0807,"Cumm Return":5.851,"Ann Return":0.3606},{"Date":"2025-07","EE":231102.92,"Stake":81835.0,"SPV":11000.0,"EVP":59410.0,"Crypto":4420.0,"Super":116702.0,"Watch":65847.0,"Ring":13000.0,"Gold":5109.0,"Cash":52903.0,"Total":641328.92,"Monthly return":0.047,"Cumm Return":6.1727,"Ann Return":0.3649},{"Date":"2025-08","EE":243001.86,"Stake":108825.0,"SPV":11000.0,"EVP":86468.0,"Crypto":4272.0,"Super":121320.0,"Watch":67427.0,"Ring":13000.0,"Gold":5195.0,"Cash":48872.0,"Total":709380.86,"Monthly return":0.1061,"Cumm Return":6.9338,"Ann Return":0.381},{"Date":"2025-09","EE":315940.91,"Stake":110998.0,"SPV":11000.0,"EVP":86468.0,"Crypto":4196.0,"Super":123716.0,"Watch":67427.0,"Ring":13000.0,"Gold":5699.0,"Cash":45713.0,"Total":784157.91,"Monthly return":0.1054,"Cumm Return":7.7702,"Ann Return":0.3966},{"Date":"2025-10","EE":314580.96,"Stake":113506.0,"SPV":11000.0,"EVP":86468.0,"Crypto":9467.83,"Super":128319.0,"Watch":66777.0,"Ring":13000.0,"Gold":6221.0,"Cash":30377.0,"Total":779716.79,"Monthly return":-0.0057,"Cumm Return":7.7205,"Ann Return":0.3895},{"Date":"2025-11","EE":313479.87,"Stake":113329.0,"SPV":11000.0,"EVP":86468.0,"Crypto":7525.5,"Super":132093.0,"Watch":68605.0,"Ring":13000.0,"Gold":6394.0,"Cash":28266.0,"Total":780160.37,"Monthly return":0.0006,"Cumm Return":7.7255,"Ann Return":0.3839},{"Date":"2025-12","EE":300290.06,"Stake":101892.0,"SPV":11000.0,"EVP":87080.0,"Crypto":7178.84,"Super":130447.0,"Watch":67351.0,"Ring":13000.0,"Gold":6681.0,"Cash":35665.0,"Total":760584.9,"Monthly return":-0.0251,"Cumm Return":7.5065,"Ann Return":0.3732},{"Date":"2026-01","EE":327926.0,"Stake":111000.0,"SPV":11000.0,"EVP":87080.0,"Crypto":7115.0,"Super":135750.0,"Watch":65649.0,"Ring":13000.0,"Gold":7223.0,"Cash":35955.0,"Total":801698,"Monthly return":0.0541,"Cumm Return":7.9663,"Ann Return":0.3785},{"Date":"2026-02","EE":276474.0,"Stake":105679.0,"SPV":23000.0,"EVP":105050.0,"Crypto":5342.0,"Super":137817,"Watch":63079.0,"Ring":13000.0,"Gold":7270.0,"Cash":24841.0,"Total":761552,"Monthly return":-0.0501,"Cumm Return":7.5173,"Ann Return":0.363}];

const ASSETS = ["EE","Stake","SPV","EVP","Crypto","Super","Watch","Ring","Gold","Cash"];
const PALETTE = { EE:"#3b82f6",Stake:"#f59e0b",SPV:"#10b981",EVP:"#a78bfa",Crypto:"#f97316",Super:"#06b6d4",Watch:"#ec4899",Ring:"#84cc16",Gold:"#eab308",Cash:"#94a3b8" };

const fmt = (n,d=0) => (n==null||isNaN(n)) ? "—" : Number(n).toLocaleString("en-AU",{minimumFractionDigits:d,maximumFractionDigits:d});
const fmtPct = n => (n==null||isNaN(n)) ? "—" : `${(n*100).toFixed(1)}%`;
const TICK = { fill:"#64748b",fontSize:11,fontFamily:"IBM Plex Mono,monospace" };

// Blurred dollar amount wrapper
function Amt({ v, blurred, style={} }) {
  return (
    <span style={{ display:"inline-block", filter:blurred?"blur(7px)":"none", transition:"filter .2s", userSelect:blurred?"none":"auto", ...style }}>
      {v}
    </span>
  );
}

// Eye icon SVG
function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function recalcReturns(data) {
  if (!data || data.length === 0) return [];
  const base = data[0].Total;
  return data.map((d,i) => {
    const prev = i > 0 ? data[i-1].Total : null;
    const monthly = (prev && prev !== 0) ? (d.Total/prev - 1) : 0;
    const cumm = base !== 0 ? (d.Total/base - 1) : 0;
    const ann = i > 0 ? Math.pow(1 + cumm, 12/i) - 1 : 0;
    return { ...d, "Monthly return": i===0?0:parseFloat(monthly.toFixed(6)), "Cumm Return":parseFloat(cumm.toFixed(6)), "Ann Return":parseFloat(ann.toFixed(6)) };
  });
}

function mergeData(seed, custom) {
  const map = {};
  seed.forEach(d => { map[d.Date] = {...d}; });
  custom.forEach(d => { map[d.Date] = {...d}; });
  return recalcReturns(Object.values(map).sort((a,b) => a.Date.localeCompare(b.Date)));
}

function TT({active, payload, label, isDollar, blurred}) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,padding:"10px 14px",fontFamily:"IBM Plex Mono,monospace",fontSize:12,color:"#94a3b8",minWidth:160}}>
      <div style={{color:"#e2e8f0",fontWeight:700,marginBottom:6}}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{display:"flex",justifyContent:"space-between",gap:16}}>
          <span style={{color:p.color||"#94a3b8"}}>{p.name}</span>
          <span style={{color:"#e2e8f0",filter:isDollar&&blurred?"blur(5px)":"none",transition:"filter .2s"}}>
            {isDollar ? `$${fmt(p.value)}` : fmtPct(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

const nextMonth = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
};

const blankForm = () => ({ Date: nextMonth(), ...Object.fromEntries(ASSETS.map(a => [a, ""])) });

export default function App() {
  const [tab, setTab] = useState("overview");
  const [modal, setModal] = useState(false);
  const [editDate, setEditDate] = useState(null);
  const [custom, setCustom] = useState([]);
  const [form, setForm] = useState(blankForm());
  const [flash, setFlash] = useState(false);
  const [blurred, setBlurred] = useState(false);

  const data = useMemo(() => mergeData(SEED_DATA, custom), [custom]);
  if (!data || data.length === 0) return <div style={{color:"white",padding:40}}>Loading...</div>;

  const latest = data[data.length-1];
  const earliest = data[0];
  const peak = Math.max(...data.map(d => d.Total));
  const drawdown = peak > 0 ? (latest.Total - peak) / peak : 0;

  const valueData = data.map(d => ({date:d.Date, Total:Math.round(d.Total)}));
  const retData = data.slice(1).map(d => ({date:d.Date, monthly:d["Monthly return"], cumm:d["Cumm Return"], ann:d["Ann Return"]}));
  const bdData = data.filter(d => d.EE != null).map(d => { const o={date:d.Date}; ASSETS.forEach(a=>{o[a]=Math.max(0,d[a]||0)}); return o; });
  const pie = ASSETS.map(a => ({name:a,value:Math.max(0,latest[a]||0)})).filter(d=>d.value>0).sort((a,b)=>b.value-a.value);
  const pieTotal = pie.reduce((s,d)=>s+d.value,0);
  const sorted = [...data.slice(1)].sort((a,b)=>a["Monthly return"]-b["Monthly return"]);
  const worst3 = sorted.slice(0,3);
  const best3 = sorted.slice(-3).reverse();
  const calcTotal = () => ASSETS.reduce((s,a)=>s+(parseFloat(form[a])||0),0);

  const openAdd = () => { setEditDate(null); setForm(blankForm()); setFlash(false); setModal(true); };
  const openEdit = (date) => {
    const e = data.find(d=>d.Date===date); if(!e) return;
    setForm({Date:e.Date,...Object.fromEntries(ASSETS.map(a=>[a,e[a]!=null?String(e[a]):"0"]))});
    setEditDate(date); setFlash(false); setModal(true);
  };
  const handleSave = () => {
    const entry = {Date:form.Date,...Object.fromEntries(ASSETS.map(a=>[a,parseFloat(form[a])||0]))};
    entry.Total = calcTotal();
    setCustom(prev => [...prev.filter(m=>m.Date!==entry.Date), entry]);
    setFlash(true); setTimeout(()=>setModal(false),700);
  };
  const handleDel = (date) => { setCustom(prev=>prev.filter(m=>m.Date!==date)); setModal(false); };
  const isCustom = date => custom.some(m=>m.Date===date);
  const TABS = ["overview","breakdown","returns","allocation","insurance","manage"];

  // Y-axis formatters that respect blur
  const yFmtDollar = v => blurred ? "●●●" : `$${(v/1000).toFixed(0)}k`;
  const yFmtPct = v => `${(v*100).toFixed(0)}%`;

  return (
    <div style={{minHeight:"100vh",background:"#070d1a",color:"#e2e8f0",fontFamily:"'IBM Plex Mono',monospace",padding:"28px 24px"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .card{background:#0d1929;border:1px solid #1e293b;border-radius:12px;padding:20px 24px}
        .inp{background:#070d1a;border:1px solid #1e293b;border-radius:6px;color:#e2e8f0;font-family:'IBM Plex Mono',monospace;font-size:13px;padding:8px 10px;width:100%;outline:none;transition:border .15s}
        .inp:focus{border-color:#f0b429} .inp:disabled{opacity:.4}
        .btn-p{background:#f0b429;color:#070d1a;border:none;border-radius:6px;padding:9px 18px;font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:700;cursor:pointer;letter-spacing:.05em}
        .btn-p:hover{opacity:.85}
        .btn-s{background:transparent;color:#94a3b8;border:1px solid #1e293b;border-radius:6px;padding:9px 18px;font-family:'IBM Plex Mono',monospace;font-size:12px;cursor:pointer}
        .btn-s:hover{border-color:#475569;color:#e2e8f0}
        .btn-d{background:transparent;color:#ef4444;border:1px solid #ef444430;border-radius:6px;padding:9px 18px;font-family:'IBM Plex Mono',monospace;font-size:12px;cursor:pointer}
        .btn-d:hover{background:#ef444415}
        .eye-btn{background:transparent;border:1px solid #1e293b;border-radius:6px;padding:7px 10px;cursor:pointer;color:#475569;display:flex;align-items:center;transition:all .15s}
        .eye-btn:hover{border-color:#475569;color:#94a3b8}
        .eye-btn.active{border-color:#f0b42960;color:#f0b429}
        .ovl{position:fixed;inset:0;background:#00000095;backdrop-filter:blur(6px);z-index:100;display:flex;align-items:center;justify-content:center;padding:16px}
        .mdl{background:#0d1929;border:1px solid #253348;border-radius:16px;padding:28px;width:540px;max-height:88vh;overflow-y:auto;max-width:100%}
        .tb{background:none;border:none;cursor:pointer;font-family:inherit;transition:all .15s;padding:8px 16px;font-size:11px;letter-spacing:.1em;text-transform:uppercase}
        .tb:hover{color:#f0b429}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28,flexWrap:"wrap",gap:16}}>
        <div>
          <div style={{fontSize:10,color:"#475569",letterSpacing:".15em",marginBottom:4}}>PERSONAL FINANCE</div>
          <h1 style={{fontFamily:"Syne,sans-serif",fontSize:26,fontWeight:800,color:"#f8fafc",letterSpacing:"-.02em"}}>Portfolio Dashboard</h1>
          <div style={{fontSize:11,color:"#475569",marginTop:4}}>{earliest.Date} → {latest.Date} · {data.length} months{custom.length>0&&<span style={{color:"#f0b42999",marginLeft:8}}>· {custom.length} custom</span>}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {/* Eye toggle */}
            <button className={`eye-btn${blurred?" active":""}`} onClick={()=>setBlurred(b=>!b)} title={blurred?"Show values":"Hide values"}>
              <EyeIcon open={!blurred}/>
            </button>
            <button className="btn-p" onClick={openAdd} style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:16,lineHeight:1}}>+</span> Add / Update Month</button>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:10,color:"#475569",letterSpacing:".1em",marginBottom:2}}>CURRENT VALUE</div>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:28,fontWeight:800,color:"#f0b429"}}>
              <Amt v={`$${fmt(latest.Total)}`} blurred={blurred}/>
            </div>
            <div style={{fontSize:11,color:latest["Monthly return"]>=0?"#22c55e":"#ef4444",marginTop:2}}>
              {latest["Monthly return"]>=0?"▲":"▼"} {fmtPct(Math.abs(latest["Monthly return"]))} this month
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI CARDS ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
        {[
          {l:"TOTAL RETURN",   v:fmtPct(latest["Cumm Return"]), s:<>From <Amt v={`$${fmt(earliest.Total)}`} blurred={blurred}/></>, c:"#22c55e", isDollar:false},
          {l:"ANN. RETURN",    v:fmtPct(latest["Ann Return"]),  s:"Since inception", c:"#3b82f6", isDollar:false},
          {l:"ALL-TIME PEAK",  v:<Amt v={`$${fmt(peak)}`} blurred={blurred}/>, s:"Highest value", c:"#f0b429", isDollar:true},
          {l:"DRAWDOWN",       v:fmtPct(drawdown), s:"From peak", c:drawdown<-0.05?"#ef4444":"#94a3b8", isDollar:false},
        ].map((k,i)=>(
          <div key={i} className="card">
            <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:8}}>{k.l}</div>
            <div style={{fontSize:20,fontWeight:700,color:k.c,fontFamily:"Syne,sans-serif"}}>{k.v}</div>
            <div style={{fontSize:11,color:"#475569",marginTop:4}}>{k.s}</div>
          </div>
        ))}
      </div>

      {/* ── TABS ── */}
      <div style={{display:"flex",marginBottom:20,borderBottom:"1px solid #1e293b"}}>
        {TABS.map(t=><button key={t} className="tb" onClick={()=>setTab(t)} style={{color:tab===t?"#f0b429":"#475569",borderBottom:tab===t?"2px solid #f0b429":"2px solid transparent",fontWeight:tab===t?700:400}}>{t}</button>)}
      </div>

      {/* ── OVERVIEW ── */}
      {tab==="overview"&&<div style={{display:"grid",gap:20}}>
        <div className="card">
          <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:16}}>PORTFOLIO VALUE</div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={valueData} margin={{top:4,right:4,left:8,bottom:0}}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f0b429" stopOpacity={.25}/><stop offset="95%" stopColor="#f0b429" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
              <XAxis dataKey="date" tick={TICK} tickLine={false} axisLine={false} interval={Math.floor(valueData.length/8)}/>
              <YAxis tick={TICK} tickLine={false} axisLine={false} tickFormatter={yFmtDollar} width={55}/>
              <Tooltip content={<TT isDollar={true} blurred={blurred}/>}/>
              <Area type="monotone" dataKey="Total" stroke="#f0b429" strokeWidth={2} fill="url(#g1)" name="Portfolio" dot={false} activeDot={{r:4,fill:"#f0b429"}}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:16}}>MONTHLY RETURNS</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={retData} margin={{top:4,right:4,left:8,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
              <XAxis dataKey="date" tick={TICK} tickLine={false} axisLine={false} interval={Math.floor(retData.length/8)}/>
              <YAxis tick={TICK} tickLine={false} axisLine={false} tickFormatter={yFmtPct} width={45}/>
              <Tooltip content={<TT isDollar={false} blurred={blurred}/>}/>
              <Bar dataKey="monthly" name="Monthly Return" radius={[2,2,0,0]}>{retData.map((d,i)=><Cell key={i} fill={d.monthly>=0?"#22c55e":"#ef4444"} fillOpacity={.85}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[{l:"🏆 BEST MONTHS",d:best3,c:"#22c55e"},{l:"📉 WORST MONTHS",d:worst3,c:"#ef4444"}].map(({l,d,c})=>(
            <div key={l} className="card">
              <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:14}}>{l}</div>
              {d.map((r,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:10,alignItems:"center"}}>
                  <span style={{fontSize:12,color:"#94a3b8"}}>{isCustom(r.Date)&&<span style={{display:"inline-block",width:7,height:7,borderRadius:"50%",background:"#f0b429",marginRight:5,verticalAlign:"middle"}}/>}{r.Date}</span>
                  <span style={{fontSize:14,fontWeight:700,color:c}}>{fmtPct(r["Monthly return"])}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>}

      {/* ── BREAKDOWN ── */}
      {tab==="breakdown"&&<div style={{display:"grid",gap:20}}>
        <div className="card">
          <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:16}}>STACKED ASSET BREAKDOWN</div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bdData} margin={{top:4,right:4,left:8,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
              <XAxis dataKey="date" tick={TICK} tickLine={false} axisLine={false} interval={Math.floor(bdData.length/7)}/>
              <YAxis tick={TICK} tickLine={false} axisLine={false} tickFormatter={yFmtDollar} width={55}/>
              <Tooltip content={<TT isDollar={true} blurred={blurred}/>}/>
              {ASSETS.map(a=><Area key={a} type="monotone" dataKey={a} stackId="1" stroke={PALETTE[a]} fill={PALETTE[a]} fillOpacity={.75} strokeWidth={0} name={a} dot={false}/>)}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:16}}>INDIVIDUAL ASSETS</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={bdData} margin={{top:4,right:4,left:8,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
              <XAxis dataKey="date" tick={TICK} tickLine={false} axisLine={false} interval={Math.floor(bdData.length/7)}/>
              <YAxis tick={TICK} tickLine={false} axisLine={false} tickFormatter={yFmtDollar} width={55}/>
              <Tooltip content={<TT isDollar={true} blurred={blurred}/>}/>
              <Legend wrapperStyle={{fontSize:11,fontFamily:"IBM Plex Mono"}}/>
              {ASSETS.map(a=><Line key={a} type="monotone" dataKey={a} stroke={PALETTE[a]} strokeWidth={1.5} dot={false} name={a} activeDot={{r:3}}/>)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>}

      {/* ── RETURNS ── */}
      {tab==="returns"&&<div style={{display:"grid",gap:20}}>
        <div className="card">
          <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:16}}>CUMULATIVE RETURN</div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={retData} margin={{top:4,right:4,left:8,bottom:0}}>
              <defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
              <XAxis dataKey="date" tick={TICK} tickLine={false} axisLine={false} interval={Math.floor(retData.length/8)}/>
              <YAxis tick={TICK} tickLine={false} axisLine={false} tickFormatter={yFmtPct} width={52}/>
              <Tooltip content={<TT isDollar={false} blurred={blurred}/>}/>
              <Area type="monotone" dataKey="cumm" stroke="#3b82f6" strokeWidth={2} fill="url(#g2)" name="Cumm. Return" dot={false} activeDot={{r:4}}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:16}}>ANNUALISED RETURN</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={retData} margin={{top:4,right:4,left:8,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
              <XAxis dataKey="date" tick={TICK} tickLine={false} axisLine={false} interval={Math.floor(retData.length/8)}/>
              <YAxis tick={TICK} tickLine={false} axisLine={false} tickFormatter={yFmtPct} width={52}/>
              <Tooltip content={<TT isDollar={false} blurred={blurred}/>}/>
              <Line type="monotone" dataKey="ann" stroke="#a78bfa" strokeWidth={2} name="Ann. Return" dot={false} activeDot={{r:4}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:14}}>RETURNS BY YEAR</div>
          {["2019","2020","2021","2022","2023","2024","2025","2026"].map(yr=>{
            const yRows=data.filter(d=>d.Date.startsWith(yr));
            if(!yRows.length) return null;
            const compound=yRows.slice(1).reduce((acc,d)=>acc*(1+d["Monthly return"]),1)-1;
            return <div key={yr} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #0f1e33"}}><span style={{fontSize:12,color:"#94a3b8"}}>{yr}</span><span style={{fontSize:11,color:"#475569"}}>{yRows.slice(1).length} months</span><span style={{fontSize:14,fontWeight:700,color:compound>=0?"#22c55e":"#ef4444"}}>{fmtPct(compound)}</span></div>;
          })}
        </div>
      </div>}

      {/* ── ALLOCATION ── */}
      {tab==="allocation"&&<div className="card">
        <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:16}}>
          CURRENT ALLOCATION — {latest.Date} — <Amt v={`$${fmt(latest.Total)}`} blurred={blurred}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:32,flexWrap:"wrap"}}>
          <PieChart width={220} height={220}>
            <Pie data={pie} cx={105} cy={105} innerRadius={65} outerRadius={100} dataKey="value" stroke="none">
              {pie.map((d,i)=><Cell key={i} fill={PALETTE[d.name]}/>)}
            </Pie>
            {/* Centre text always shows shape of number, blur via foreignObject workaround not possible in SVG — show ●●● when blurred */}
            <text x={105} y={100} textAnchor="middle" dominantBaseline="middle" fill="#f0b429" fontSize={blurred?20:18} fontFamily="Syne" fontWeight={800}>
              {blurred ? "●●●" : `$${fmt(latest.Total/1000)}k`}
            </text>
            <text x={105} y={120} textAnchor="middle" dominantBaseline="middle" fill="#475569" fontSize={10} fontFamily="IBM Plex Mono">TOTAL</text>
          </PieChart>
          <div style={{flex:1,minWidth:220}}>
            {pie.map(d=>(
              <div key={d.name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
                <div style={{width:9,height:9,borderRadius:2,background:PALETTE[d.name],flexShrink:0}}/>
                <span style={{fontSize:12,color:"#94a3b8",width:56}}>{d.name}</span>
                <div style={{flex:1,height:4,background:"#1e293b",borderRadius:2,overflow:"hidden"}}><div style={{width:`${pieTotal>0?(d.value/pieTotal*100).toFixed(1):0}%`,height:"100%",background:PALETTE[d.name],borderRadius:2}}/></div>
                <span style={{fontSize:12,color:"#e2e8f0",width:80,textAlign:"right"}}><Amt v={`$${fmt(d.value)}`} blurred={blurred}/></span>
                <span style={{fontSize:11,color:"#475569",width:38,textAlign:"right"}}>{pieTotal>0?(d.value/pieTotal*100).toFixed(1):0}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>}


      {/* ── INSURANCE ── */}
      {tab==="insurance"&&<div style={{display:"grid",gap:20}}>

        {/* Bradley */}
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div>
              <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:2}}>AS AT 05/03/2026</div>
              <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:2}}>POLICYHOLDER</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:800,color:"#3b82f6"}}>Bradley</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:2}}>ANNUAL PREMIUM</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,color:"#f0b429"}}><Amt v="$4,893.60" blurred={blurred}/></div>
            </div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{color:"#475569",fontSize:10,letterSpacing:".08em"}}>
                {["COVER TYPE","COVER AMOUNT","PAYOUT TYPE","ANNUAL PREMIUM","TYPE","WAITING","ENDS"].map(h=>(
                  <th key={h} style={{textAlign:"left",padding:"6px 8px",borderBottom:"1px solid #1e293b",whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {[
                  {type:"Income Protection",       amount:"$10,825/mo",         payout:"Monthly income replacement", premium:"$2,389.80", ptype:"Level",   wait:"90 days", ends:"Age 65",        color:"#06b6d4"},
                  {type:"IP Top-Up",               amount:"$12,629/mo (2 yrs)", payout:"Monthly (first 2 years)",   premium:"Included",  ptype:"Level",   wait:"90 days", ends:"Age 65",        color:"#06b6d4"},
                  {type:"Super Contribution",      amount:"$1,894/mo",          payout:"Monthly",                   premium:"Included",  ptype:"Level",   wait:"90 days", ends:"Age 65",        color:"#06b6d4"},
                  {type:"Trauma",                  amount:"$410,051",           payout:"Lump sum – serious illness", premium:"$1,670.88", ptype:"Level",   wait:"None",    ends:"Aug 2062 (~65)",color:"#ec4899"},
                  {type:"Life Insurance",          amount:"$1,581,625",         payout:"Lump sum on death",         premium:"$487.56",   ptype:"Stepped", wait:"None",    ends:"Mar 2071 (~117)",color:"#22c55e"},
                  {type:"TPD (Split)",             amount:"$421,766",           payout:"Lump sum – perm. disability",premium:"$153.96",  ptype:"Stepped", wait:"None",    ends:"Aug 2062 (~65)",color:"#a78bfa"},
                  {type:"Policy / Plan Fee",       amount:"—",                  payout:"—",                         premium:"$191.40",   ptype:"—",       wait:"—",       ends:"—",             color:"#475569"},
                ].map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #0a1628"}}>
                    <td style={{padding:"8px",display:"flex",alignItems:"center",gap:8}}>
                      <span style={{display:"inline-block",width:8,height:8,borderRadius:2,background:r.color,flexShrink:0}}/>
                      <span style={{color:"#e2e8f0"}}>{r.type}</span>
                    </td>
                    <td style={{padding:"8px",color:"#f0b429",fontWeight:700}}><Amt v={r.amount} blurred={blurred&&!r.amount.includes("mo")&&r.amount!=="—"}/></td>
                    <td style={{padding:"8px",color:"#94a3b8"}}>{r.payout}</td>
                    <td style={{padding:"8px",color:"#e2e8f0",fontWeight:600}}><Amt v={r.premium} blurred={blurred&&r.premium!=="Included"&&r.premium!=="—"}/></td>
                    <td style={{padding:"8px",color:"#94a3b8"}}>{r.ptype}</td>
                    <td style={{padding:"8px",color:"#94a3b8"}}>{r.wait}</td>
                    <td style={{padding:"8px",color:"#94a3b8",whiteSpace:"nowrap"}}>{r.ends}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Martine */}
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div>
              <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:2}}>AS AT 05/03/2026</div>
              <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:2}}>POLICYHOLDER</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:800,color:"#ec4899"}}>Martine</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:2}}>ANNUAL PREMIUM</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,color:"#f0b429"}}><Amt v="$2,426.22" blurred={blurred}/></div>
            </div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{color:"#475569",fontSize:10,letterSpacing:".08em"}}>
                {["COVER TYPE","COVER AMOUNT","PAYOUT TYPE","ANNUAL PREMIUM","TYPE","WAITING","ENDS"].map(h=>(
                  <th key={h} style={{textAlign:"left",padding:"6px 8px",borderBottom:"1px solid #1e293b",whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {[
                  {type:"Life Insurance", amount:"$406,712",  payout:"Lump sum on death",          premium:"$206.70",   ptype:"Stepped", wait:"None", ends:"Nov 2065 (~107)", color:"#22c55e"},
                  {type:"Trauma",         amount:"$406,712",  payout:"Lump sum – serious illness",  premium:"$2,219.52", ptype:"Level",   wait:"None", ends:"Nov 2065 (~65)",  color:"#ec4899"},
                ].map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #0a1628"}}>
                    <td style={{padding:"8px",display:"flex",alignItems:"center",gap:8}}>
                      <span style={{display:"inline-block",width:8,height:8,borderRadius:2,background:r.color,flexShrink:0}}/>
                      <span style={{color:"#e2e8f0"}}>{r.type}</span>
                    </td>
                    <td style={{padding:"8px",color:"#f0b429",fontWeight:700}}><Amt v={r.amount} blurred={blurred}/></td>
                    <td style={{padding:"8px",color:"#94a3b8"}}>{r.payout}</td>
                    <td style={{padding:"8px",color:"#e2e8f0",fontWeight:600}}><Amt v={r.premium} blurred={blurred}/></td>
                    <td style={{padding:"8px",color:"#94a3b8"}}>{r.ptype}</td>
                    <td style={{padding:"8px",color:"#94a3b8"}}>{r.wait}</td>
                    <td style={{padding:"8px",color:"#94a3b8",whiteSpace:"nowrap"}}>{r.ends}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Household Totals */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div className="card">
            <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:16}}>HOUSEHOLD COVERAGE TOTALS</div>
            {[
              {l:"Total Life Insurance",  v:"$1,988,337",           c:"#22c55e"},
              {l:"Total Trauma Cover",    v:"$816,763",             c:"#ec4899"},
              {l:"Total TPD",             v:"$421,766",             c:"#a78bfa"},
              {l:"Income Protection",     v:"$10,825/mo",           c:"#06b6d4", noBlur:true},
              {l:"IP Top-Up (2 yrs)",     v:"+ $12,629/mo",        c:"#06b6d4", noBlur:true},
              {l:"Total Annual Premium",  v:"$7,319.82",            c:"#f0b429"},
            ].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #0f1e33"}}>
                <span style={{fontSize:12,color:"#94a3b8"}}>{r.l}</span>
                <span style={{fontSize:14,fontWeight:700,color:r.c}}><Amt v={r.v} blurred={blurred&&!r.noBlur}/></span>
              </div>
            ))}
          </div>
          <div className="card">
            <div style={{fontSize:10,color:"#475569",letterSpacing:".12em",marginBottom:16}}>COVER END SCHEDULE</div>
            {[
              {l:"Income Protection",    v:"Age 65",           c:"#06b6d4"},
              {l:"TPD",                  v:"Age 65",           c:"#a78bfa"},
              {l:"Trauma (both)",        v:"~Age 65",          c:"#ec4899"},
              {l:"Life (Bradley)",       v:"~Age 117",         c:"#22c55e"},
              {l:"Life (Martine)",       v:"~Age 107",         c:"#22c55e"},
            ].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #0f1e33"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{display:"inline-block",width:8,height:8,borderRadius:2,background:r.c}}/>
                  <span style={{fontSize:12,color:"#94a3b8"}}>{r.l}</span>
                </div>
                <span style={{fontSize:14,fontWeight:700,color:r.c}}>{r.v}</span>
              </div>
            ))}
            <div style={{marginTop:20,padding:"12px 16px",background:"#070d1a",borderRadius:8,border:"1px solid #1e293b"}}>
              <div style={{fontSize:10,color:"#475569",letterSpacing:".1em",marginBottom:6}}>PREMIUM SPLIT</div>
              <div style={{display:"flex",height:8,borderRadius:4,overflow:"hidden",marginBottom:8}}>
                <div style={{width:`${(4893.60/7319.82*100).toFixed(1)}%`,background:"#3b82f6"}}/>
                <div style={{width:`${(2426.22/7319.82*100).toFixed(1)}%`,background:"#ec4899"}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11}}>
                <span style={{color:"#3b82f6"}}>Bradley <Amt v="$4,894" blurred={blurred}/> ({(4893.60/7319.82*100).toFixed(0)}%)</span>
                <span style={{color:"#ec4899"}}>Martine <Amt v="$2,426" blurred={blurred}/> ({(2426.22/7319.82*100).toFixed(0)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>}

      {/* ── MANAGE ── */}
      {tab==="manage"&&<div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:10,color:"#475569",letterSpacing:".12em"}}>YOUR CUSTOM ENTRIES ({custom.length})</div>
          <button className="btn-p" onClick={openAdd}>+ Add Month</button>
        </div>
        {custom.length===0
          ? <div style={{fontSize:12,color:"#475569",padding:"24px 0",textAlign:"center"}}>No custom entries yet. Click "Add Month" to log a new month.</div>
          : <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr style={{color:"#475569",fontSize:10,letterSpacing:".08em"}}>
                  <th style={{textAlign:"left",padding:"6px 8px",borderBottom:"1px solid #1e293b"}}>DATE</th>
                  {ASSETS.map(a=><th key={a} style={{textAlign:"right",padding:"6px 8px",borderBottom:"1px solid #1e293b"}}>{a}</th>)}
                  <th style={{textAlign:"right",padding:"6px 8px",borderBottom:"1px solid #1e293b"}}>TOTAL</th>
                  <th style={{borderBottom:"1px solid #1e293b"}}/>
                </tr></thead>
                <tbody>
                  {[...custom].sort((a,b)=>b.Date.localeCompare(a.Date)).map(m=>(
                    <tr key={m.Date} style={{borderBottom:"1px solid #0a1628"}}>
                      <td style={{padding:"8px",color:"#f0b429",fontWeight:700}}>{m.Date}</td>
                      {ASSETS.map(a=><td key={a} style={{textAlign:"right",padding:"8px",color:"#94a3b8"}}><Amt v={`$${fmt(m[a]||0)}`} blurred={blurred}/></td>)}
                      <td style={{textAlign:"right",padding:"8px",color:"#e2e8f0",fontWeight:700}}><Amt v={`$${fmt(m.Total)}`} blurred={blurred}/></td>
                      <td style={{padding:"8px",textAlign:"right",whiteSpace:"nowrap"}}>
                        <button onClick={()=>openEdit(m.Date)} style={{background:"none",border:"1px solid #1e293b",borderRadius:4,color:"#94a3b8",cursor:"pointer",padding:"3px 8px",fontSize:11,fontFamily:"inherit",marginRight:6}}>Edit</button>
                        <button onClick={()=>handleDel(m.Date)} style={{background:"none",border:"1px solid #ef444430",borderRadius:4,color:"#ef4444",cursor:"pointer",padding:"3px 8px",fontSize:11,fontFamily:"inherit"}}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </div>}

      {/* ── MODAL ── */}
      {modal&&(
        <div className="ovl" onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
          <div className="mdl">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <div>
                <div style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:800,color:"#f8fafc"}}>{editDate?`Edit ${editDate}`:"Add New Month"}</div>
                <div style={{fontSize:11,color:"#475569",marginTop:3}}>Enter values for each asset — total is calculated for you.</div>
              </div>
              <button onClick={()=>setModal(false)} style={{background:"none",border:"none",color:"#475569",fontSize:20,cursor:"pointer",lineHeight:1,paddingLeft:12}}>✕</button>
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:10,color:"#475569",letterSpacing:".1em",display:"block",marginBottom:6}}>MONTH (YYYY-MM)</label>
              <input className="inp" type="text" placeholder="2026-04" value={form.Date} onChange={e=>setForm({...form,Date:e.target.value})} disabled={!!editDate}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px 16px",marginBottom:20}}>
              {ASSETS.map(a=>(
                <div key={a}>
                  <label style={{fontSize:10,color:"#475569",letterSpacing:".1em",display:"block",marginBottom:5}}>
                    <span style={{display:"inline-block",width:8,height:8,borderRadius:2,background:PALETTE[a],marginRight:6,verticalAlign:"middle"}}/>
                    {a}
                  </label>
                  <input className="inp" type="number" placeholder="0" value={form[a]} onChange={e=>setForm({...form,[a]:e.target.value})}/>
                </div>
              ))}
            </div>
            <div style={{background:"#070d1a",border:"1px solid #1e293b",borderRadius:8,padding:"12px 16px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,color:"#475569",letterSpacing:".1em"}}>CALCULATED TOTAL</span>
              <span style={{fontSize:22,fontWeight:700,color:"#f0b429",fontFamily:"Syne,sans-serif"}}>${fmt(calcTotal())}</span>
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",flexWrap:"wrap"}}>
              {editDate&&<button className="btn-d" onClick={()=>handleDel(editDate)}>Delete</button>}
              <button className="btn-s" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn-p" onClick={handleSave}>{flash?"✓ Saved!":editDate?"Update":"Save Month"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
