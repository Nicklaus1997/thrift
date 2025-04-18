"""
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
"""

#!/bin/sh
IFS=''
if [ $# -eq 0 ]; then
    echo "No input files provided eg tutorial.thrift"
    exit 1
fi
if [ -d gen-js ]; then rm -Rf gen-js; fi
# create OpenHarmony folder and copy Js files
#generate thrift files JS
thrift -v -r --gen js $1
sleep 1
if [ -d gen-js ]   # For file "if [ -f /home/rama/file ]"
then
    echo "Thrift JS files generated...."
else
    echo "error in generating thrift output ,check the input thrift file syntax !"
    exit 1
fi
mkdir -p gen-ohos
rm -rf gen-ohos/*

currentValue =''
suffix=".js"
cd gen-js;
for filename in *;
do echo "file: ${filename}";
    #echo "copying..."
    exec<${filename}
    cp ${filename} ../gen-ohos;
    #echo "file ${filename} moved to gen-ohos";
done
cd ../gen-ohos;
#echo "list of files:";
#ls;
for filename in *;
do
    echo "file: ${filename}";
    # check for the global functions and add var prefix
    sed -i 's/\(^[a-zA-Z0-9_ ]*= function.*$\)/var \1/' ${filename}
    #sed -i 's/\^((?!(\s+|var))[a-zA-Z0-9_ ]*= .*)/var \1/' ${filename}
    sed -i 's/new Int64/new int64/g' ${filename}
    # check constants and add var 
    sed -i 's/\(^[a-zA-Z0-9_]*CONSTANT = .*$\)/var \1/' ${filename}
    sed -i 's/\(^[a-zA-Z0-9_]* = .*$\)/var \1/' ${filename}
    # add comoon import -thrift
    sed -i '1s/^/import {int64} from \x27@ohos/thrift\x27\n/' ${filename}
    sed -i '1s/^/import {Thrift} from \x27@ohos/thrift\x27\n/' ${filename}
    echo "reading..."
    exec<${filename}
    value=0
    i=0
    exports=()
    while read line
    do
        #value='expr ${value} +1';
        #echo ${line};
        if [[ "$line" =~ (^\s*var [a-zA-Z0-9_ ]*) ]]; then
            #echo "got the line: ${line}";
            
            if [[ "$line" =~ (^\s+var [a-zA-Z0-9_ ]*) ]]; then
                #echo "ignore the line: ${line}";
                :
            else
                echo "exporting" $line | cut -d " " -f 3;
                exports+=($(echo "exporting" $line | cut -d " " -f 3));
            fi
            
        fi
    done
    printf -v joined '%s,' "${exports[@]}"
    # adding export statement for the global functions
    echo "export {${joined%,}};" >>  ${filename}
    # checking the exports in other files for dependency
    echo "read done for ${filename}";
    
    # checking exports dependency
    #echo "current file ${filename} ";
    for i in "${exports[@]}"
    do
        currentValue=$i
        #echo "checking for: " ${currentValue}
        grep -l -R "$(printf '%s|' "${currentValue}" | sed 's/|$//')"  *.js  | while read -r line ; do
            #echo "in file file: $line"
            #echo "got ${currentValue} in file ${line} " ;
            if [ "$line" = "$filename" ]; then
                #echo "ignore file: $line"
                :
            else
                #echo "added exports in  file  $line"
                temp="import  {${currentValue}} from './${filename/%$suffix}'"
                #echo "adding  ${temp}"
                sed -i "2i ${temp}" ${line}
            fi
        done
    done
done

